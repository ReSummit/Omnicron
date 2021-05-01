const express = require('express');
const router = express.Router();

/* GET data listing. */
router.get('/', function(req, res, next) {
  console.log(req.body.username);
  const info = {
    username: req.params.username,
    password: req.params.password,
    title: 'api',
    msg: 'Hello World'
  }
  res.status(200).json({ info });
});

router.post('/', function(req, res, next) {
  console.log(req);
  
});

module.exports = router;
