const express = require('express');
const router = express.Router();

//  @route  GET api/records/test
//  @desc   testing records route
//  @access Public
router.get('/test', (req, res) =>
  res.json({ message: 'api/records test success' })
);

module.exports = router;
