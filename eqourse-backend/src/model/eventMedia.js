const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  eventSlug: { type: String, required: true, enum: require('../utils/eventMediaFields').catalog.map(event => event.slug), index: true },
  slug: { type: String, required: true }, title: { type: String, required: true, maxlength: 140 },
  description: { type: String, required: true, maxlength: 3000 },
  imageUrl: { type: String, required: true }, objectKey: { type: String, required: true, unique: true },
  imageAlt: String, imageTitle: String, mimeType: String, size: Number, width: Number, height: Number,
  seo: { title: String, description: String, ogImageUrl: String },
  status: { type: String, enum: ['draft','published'], default: 'draft', index: true },
  publishedAt: Date,
}, { timestamps: true });
schema.index({eventSlug:1,slug:1},{unique:true});
module.exports = mongoose.model('EventMedia', schema);
