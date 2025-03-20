const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortUrl: { type: String, unique: true, required: true },
  longUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  clickData: [
    {
      ipAddress: String,
      country: String,
      region: String,
      city: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Url', urlSchema);
