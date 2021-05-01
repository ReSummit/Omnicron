const express = require('express');
const router = express.Router();

/* GET data listing. */
router.get('/', function(req, res, next) {
  console.log(req);
  const info = {
    title: 'api',
    msg: 'Hello World'
  }
  res.status(200).json({ info });
});

router.post('/', function(req, res, next) {
  console.log(req);
});

module.exports = router;
