const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  // path.join() is used vs concat because it detects the operating system the app is running on and adjusts for '/' or '\'
  res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;