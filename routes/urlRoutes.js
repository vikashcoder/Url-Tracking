const express = require('express');
const shortid = require('shortid');
const Url = require('../models/url');
const client = require('../config/redis');
const geo = require('geoip-lite'); // ✅ Import geoip-lite

const router = express.Router();

// Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) return res.status(400).json({ error: 'Invalid URL' });

  const shortUrl = shortid.generate();
  const newUrl = await Url.create({ shortUrl, longUrl });

  // Cache the result in Redis
  await client.set(shortUrl, longUrl);

  res.json({ shortUrl, longUrl });
});

// Resolve short URL and track clicks
router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip === '::1' || ip === '127.0.0.1') ip = '8.8.8.8'; // Use public IP for local testing

    const location = geo.lookup(ip) || {};

    console.log(`IP Address: ${ip}`);
    console.log(`Location:`, location);

    const url = await Url.findOne({ shortUrl });
    if (url) {
      url.clicks++;
      url.clickData.push({
        ipAddress: ip,
        country: location.country || 'Unknown',
        region: location.region || 'Unknown',
        city: location.city || 'Unknown',
        timestamp: new Date(),
      });
      await url.save();
      return res.redirect(url.longUrl);
    }

    res.status(404).json({ error: 'URL not found' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get URL stats
router.get('/:shortUrl/stats', async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });

  if (url) return res.json(url);
  res.status(404).json({ error: 'URL not found' });
});

module.exports = router;
