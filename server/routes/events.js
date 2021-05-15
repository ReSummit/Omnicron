const express = require('express');
const router = express.Router();
let Event = require('../models/Event.js');

/* GET data listing. */
router.get('/:event_id', function(req, res, next) {
  res.status(200).json({ event: Event.findById(req.params.event_id) });
});

router.post('/add', function(req, res) {
  if ( req.body && req.body.event_name && req.body.people && req.body.time) {
    const event_name = req.body.name;
    const repeating = req.body.repeating;
    const people = req.body.people;
    const time =  req.body.time;
    const decided = req.body.decided;

    const newEvent = new Event({
        event_name,
        repeating,
        people,
        time,
        decided
    });

    newEvent.save()
        .then(() => res.status(200).json({ status: "Event Added" }))
        .catch(err => res.status(400).json('Error: ' + err));
  }
  else {
      res.status(400).json('Error: ' + err);
  }
});
/*router.delete('/:event_id/delete', function(req, res, next) {
  //res.stat
});*/
module.exports = router;

