const jwt = require('jsonwebtoken');
const EventMedia = require('../model/eventMedia');
const { fields,objectKey,countryEvent,MAX_BYTES } = require('../utils/eventMediaFields');
const storage = require('../utils/eventStorage');
const {syncCmsSeoPage} = require('../utils/cmsSeoPublisher');
const multer=require('multer');
const diskFs=require('node:fs/promises');
const path=require('node:path');
const ephemeralSecret=require('node:crypto').randomBytes(32).toString('hex');
const secret=()=>process.env.EVENT_UPLOAD_TOKEN_SECRET||process.env.JWT_SECRET||ephemeralSecret;
function decodeTicket(req,token) { const ticket=jwt.verify(token,secret(),{audience:'event-media',issuer:'eqourse-api',algorithms:['HS256']});if(ticket.purpose!=='event-media-upload'||ticket.adminId!==req.admin._id.toString())throw Object.assign(new Error('Upload authorisation does not match this administrator.'),{status:400});return ticket; }
const upload=multer({limits:{fileSize:MAX_BYTES,files:1,fields:1},fileFilter(req,file,cb){try{const ticket=decodeTicket(req,req.body.uploadToken);if(ticket.mimeType!==file.mimetype)throw new Error('Image type does not match upload authorisation.');storage.diskPath(ticket.key);req.eventUpload=ticket;cb(null,true);}catch(error){cb(error);}},storage:multer.diskStorage({destination(req,file,cb){const directory=path.dirname(storage.diskPath(req.eventUpload.key));diskFs.mkdir(directory,{recursive:true}).then(()=>cb(null,directory),cb);},filename(req,file,cb){cb(null,path.basename(storage.diskPath(req.eventUpload.key)));}})}).single('file');
const view=doc=>({...doc.toObject(),id:doc._id.toString()});
const handle = fn => async(req,res)=>{try {await fn(req,res);}catch(error){const status=error.status|| (error.name==='ValidationError'||error.name==='JsonWebTokenError'||error.name==='TokenExpiredError'?400:500);console.error('Event media operation failed:',error.message);res.status(status).json({success:false,message:status===500?'Could not save event media. Please try again.':error.message});}};
exports.config=handle(async(req,res)=>res.json({success:true,data:storage.configuration()}));
exports.sign=handle(async(req,res)=>{
 const metadata=fields(req.body);const size=Number(req.body.size),mimeType=req.body.mimeType;
 if(!Number.isSafeInteger(size)||size<1||size>MAX_BYTES)throw Object.assign(new Error('Choose an image no larger than 10 MB.'),{status:400});
 const key=objectKey(metadata.eventSlug,metadata.title,mimeType);
 if(!storage.configuration().configured)throw Object.assign(new Error("Set EVENT_MEDIA_DISK_ROOT to the existing CDN origin directory before uploading."),{status:503});
 storage.diskPath(key);
 const uploadToken=jwt.sign({purpose:'event-media-upload',adminId:req.admin._id.toString(),key,eventSlug:metadata.eventSlug,mimeType,size},secret(),{expiresIn:'15m',audience:'event-media',issuer:'eqourse-api'});
 res.json({success:true,data:{transport:"origin",uploadToken}});
});
exports.create=handle(async(req,res)=>{
 const metadata=fields(req.body);const ticket=decodeTicket(req,req.body.uploadToken);
 if(ticket.purpose!=='event-media-upload'||ticket.eventSlug!==metadata.eventSlug||ticket.adminId!==req.admin._id.toString())throw Object.assign(new Error('Upload authorisation does not match this event.'),{status:400});
 await storage.verifyObject(ticket.key,ticket.mimeType,ticket.size);
 const suffix=ticket.key.split('/').pop().replace(/\.[^.]+$/,'');
 const doc=await EventMedia.create({...metadata,slug:suffix,imageUrl:storage.cdnUrl(ticket.key),objectKey:ticket.key,mimeType:ticket.mimeType,size:ticket.size,
   width:Number.isInteger(req.body.width)&&req.body.width>0?req.body.width:undefined,height:Number.isInteger(req.body.height)&&req.body.height>0?req.body.height:undefined,
   seo:{...metadata.seo,ogImageUrl:storage.cdnUrl(ticket.key)},publishedAt:metadata.status==='published'?new Date():undefined});
 try{await syncCmsSeoPage('event-photo',doc.toObject());}catch(error){await EventMedia.findByIdAndUpdate(doc._id,{status:'draft'});throw Object.assign(new Error('Image uploaded and saved as a draft. SEO publication failed; retry publishing from Event Photos.'),{status:503});}
 res.status(201).json({success:true,data:view(doc)});
});
exports.adminList=handle(async(req,res)=>{countryEvent(req.params.eventSlug);const items=await EventMedia.find({eventSlug:req.params.eventSlug}).sort({createdAt:-1}).limit(200);res.json({success:true,data:{items:items.map(view)}});});
exports.update=handle(async(req,res)=>{
 if(!/^[a-f0-9]{24}$/i.test(req.params.id))throw Object.assign(new Error('Invalid image identifier.'),{status:400});
 const doc=await EventMedia.findById(req.params.id);if(!doc)throw Object.assign(new Error('Event image not found.'),{status:404});
 const metadata=fields({...req.body,eventSlug:doc.eventSlug});const before=doc.toObject();Object.assign(doc,metadata);doc.seo.ogImageUrl=doc.imageUrl;if(doc.status==='published'&&!doc.publishedAt)doc.publishedAt=new Date();await doc.save();
 try{await syncCmsSeoPage('event-photo',doc.toObject());}catch(error){await EventMedia.findByIdAndUpdate(doc._id,{title:before.title,description:before.description,imageAlt:before.imageAlt,imageTitle:before.imageTitle,seo:before.seo,status:before.status,publishedAt:before.publishedAt});throw Object.assign(new Error('SEO publication could not complete. Your previous published version was preserved. Please retry.'),{status:503});}
 res.json({success:true,data:view(doc)});
});
exports.publicList=handle(async(req,res)=>{countryEvent(req.params.eventSlug);const items=await EventMedia.find({eventSlug:req.params.eventSlug,status:'published'}).sort({publishedAt:-1}).limit(200);res.set('Cache-Control','public, max-age=30, s-maxage=60');res.json({success:true,data:{items:items.map(view)}});});
exports.publicPhoto=handle(async(req,res)=>{countryEvent(req.params.eventSlug);const doc=await EventMedia.findOne({eventSlug:req.params.eventSlug,slug:req.params.imageSlug,status:'published'});if(!doc)throw Object.assign(new Error('Event highlight not found.'),{status:404});res.json({success:true,data:view(doc)});});

exports.uploadFile=(req,res)=>{upload(req,res,async error=>{try{if(error)throw error;if(!req.file)throw new Error('Choose an image to upload.');const ticket=req.eventUpload;await storage.verifyObject(ticket.key,ticket.mimeType,ticket.size);res.json({success:true,data:{uploaded:true}});}catch(error){if(req.file)await diskFs.unlink(req.file.path).catch(()=>{});res.status(400).json({success:false,message:error.message});}});};
