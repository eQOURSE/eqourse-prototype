const mongoose = require("mongoose");

const sampleTabSettingSchema = new mongoose.Schema({
  pageSlug: { type: String, required: true, trim: true },
  tabName: { type: String, required: true, trim: true },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

sampleTabSettingSchema.index({ pageSlug: 1, tabName: 1 }, { unique: true });

module.exports = mongoose.model("SampleTabSetting", sampleTabSettingSchema);
