const express=require('express');const controller=require('../controller/eventMediaController');const router=express.Router();
router.get('/:eventSlug/media',controller.publicList);
router.get('/:eventSlug/media/:imageSlug',controller.publicPhoto);
module.exports=router;
