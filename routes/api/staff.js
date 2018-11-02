const express = require('express');
const router = express.Router();

//  @route  GET api/staff/test
//  @desc   testing staff route
//  @access Public
router.get('/test', (req, res) =>
  res.json({ message: 'api/staff test success' })
);

module.exports = router;
