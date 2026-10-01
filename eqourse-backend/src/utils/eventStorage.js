const fs = require('node:fs/promises');
const path = require('node:path');
const { allowedTypes, countryEvent } = require('./eventMediaFields');
function configuration() {
  return {configured:!!process.env.EVENT_MEDIA_DISK_ROOT,missing:process.env.EVENT_MEDIA_DISK_ROOT?[]:['EVENT_MEDIA_DISK_ROOT'],transport:'origin',cdnBaseUrl:process.env.EVENT_CDN_BASE_URL||'https://cdn.eqourse.com'};
}
function diskPath(key) {
  if(!configuration().configured)throw Object.assign(new Error('Set EVENT_MEDIA_DISK_ROOT to the existing Utho directory served by the CDN.'),{status:503});
  const match=/^events\/([^/]+)\/gallery\/[a-z0-9-]+\.(jpg|png|webp|avif)$/.exec(key);
  if(!match)throw Object.assign(new Error('Invalid event image path.'),{status:400});
  countryEvent(match[1]);
  const root=path.resolve(process.env.EVENT_MEDIA_DISK_ROOT);const target=path.resolve(root,key);
  if(!target.startsWith(root+path.sep))throw Object.assign(new Error('Invalid storage path.'),{status:400});
  return target;
}
function cdnUrl(key) {
  const base=new URL(process.env.EVENT_CDN_BASE_URL||'https://cdn.eqourse.com');
  if(base.protocol!=='https:'||base.username||base.password||base.search||base.hash)throw Object.assign(new Error('Use a clean HTTPS CDN base URL.'),{status:503});
  return base.href.replace(/\/+$/,'')+'/'+key.split('/').map(encodeURIComponent).join('/');
}
async function verifyObject(key,mimeType,size) {
  const file=diskPath(key),stat=await fs.stat(file);if(!stat.isFile()||stat.size!==size)throw Object.assign(new Error('Uploaded image size verification failed.'),{status:400});
  const handle=await fs.open(file,'r');const header=Buffer.alloc(256);let bytes;
  try{({bytesRead:bytes}=await handle.read(header,0,256,0));}finally{await handle.close();}
  const data=header.subarray(0,bytes);
  const valid=mimeType==='image/jpeg'?data.subarray(0,3).equals(Buffer.from([255,216,255])):mimeType==='image/png'?data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):mimeType==='image/webp'?data.toString('ascii',0,4)==='RIFF'&&data.toString('ascii',8,12)==='WEBP':mimeType==='image/avif'?data.toString('ascii',4,8)==='ftyp'&&(data.includes(Buffer.from('avif'))||data.includes(Buffer.from('avis'))):false;
  if(!valid||!key.endsWith('.'+allowedTypes[mimeType]))throw Object.assign(new Error('File contents do not match the selected image type.'),{status:400});
  return stat;
}
module.exports={configuration,diskPath,verifyObject,cdnUrl};
