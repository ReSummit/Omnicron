const express = require('express');
const router = express.Router();
const { Event } = require('../models/Event');

/* GET data listing. */
router.get('/:event_id', function(req, res, next) {
  res.status(200).json({ event: Event.findById(req.params.event_id) });
});


module.exports = router;
