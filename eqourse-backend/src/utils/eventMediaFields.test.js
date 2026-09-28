const test=require('node:test');const assert=require('node:assert/strict');
const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const {fields,objectKey,MAX_BYTES}=require('./eventMediaFields');
const {configuration,diskPath,verifyObject,cdnUrl}=require('./eventStorage');
test('metadata derives accessible plain text and bounded SEO',()=>{
 const photo=fields({eventSlug:'japan-tour-2026',title:'<b>Tokyo Team Meeting</b>',description:'Discussing multilingual AI data and education projects with our business partners in Tokyo.',status:'published'});
 assert.equal(photo.imageTitle,'Tokyo Team Meeting');assert.match(photo.imageAlt,/Japan/);assert.ok(!photo.imageAlt.includes('<'));assert.ok(photo.seo.title.length<=60);assert.ok(photo.seo.description.length<=160);
});
test('rejects invalid countries, descriptions and publication states',()=>{
 for(const overrides of [{eventSlug:'../../etc'},{description:'short'},{status:'public'}])assert.throws(()=>fields({eventSlug:'china-tour-2026',title:'Team meeting',description:'A meeting about multilingual data services.',...overrides}));
});
test('storage accepts only bounded country paths and real matching image signatures',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'eqourse-event-image-'));const old=process.env.EVENT_MEDIA_DISK_ROOT;process.env.EVENT_MEDIA_DISK_ROOT=root;
 try{const key=objectKey('singapore-tour-2026','../../Meeting','image/png');assert.match(key,/^events\/singapore-tour-2026\/gallery\/[a-z0-9-]+\.png$/);assert.throws(()=>diskPath('../../outside'));assert.throws(()=>objectKey('japan-tour-2026','Test','image/svg+xml'));
 const target=diskPath(key);await fs.mkdir(path.dirname(target),{recursive:true});const data=Buffer.from([137,80,78,71,13,10,26,10,0]);await fs.writeFile(target,data);await verifyObject(key,'image/png',data.length);await assert.rejects(verifyObject(key,'image/png',100));await fs.writeFile(target,'not-image');await assert.rejects(verifyObject(key,'image/png',9));assert.equal(cdnUrl(key),'https://cdn.eqourse.com/'+key);assert.equal(MAX_BYTES,10485760);
 }finally{if(old===undefined)delete process.env.EVENT_MEDIA_DISK_ROOT;else process.env.EVENT_MEDIA_DISK_ROOT=old;await fs.rm(root,{recursive:true,force:true});}
});
test('configuration names missing origin without exposing secrets',()=>{const old=process.env.EVENT_MEDIA_DISK_ROOT;delete process.env.EVENT_MEDIA_DISK_ROOT;try{assert.equal(configuration().configured,false);assert.deepEqual(configuration().missing,['EVENT_MEDIA_DISK_ROOT']);}finally{if(old!==undefined)process.env.EVENT_MEDIA_DISK_ROOT=old;}});
