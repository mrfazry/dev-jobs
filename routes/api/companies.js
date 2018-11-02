const express = require('express');
const router = express.Router();

//  @route  GET api/companies/test
//  @desc   testing companies route
//  @access Public
router.get('/test', (req, res) =>
  res.json({ message: 'api/companies test success' })
);

module.exports = router;
