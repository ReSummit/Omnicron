const express = require('express');
const router = express.Router();
var Profile = require('../models/Profile');
var Event = require('../models/Event');

/* GET data listing. */
router.get('/:event_id', function(req, res, next) {
  res.status(200).json({ event: Event.findById(req.params.event_id) });
});

/* Create event and add to every profile */
router.post('/add', async function(req, res) {
  if ( req.body && req.body.name && req.body.people && req.body.time) {
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
    
    newEvent.save();

    for(const p of people){
      await Profile.findById(p.profile).then(
        person => {
          person.events.push({
            event: newEvent._id,
            host: p.host
           });

          person.save().then(() => res.status(200).json({ status: 'Exercise updated!' }));
        }
      ).catch(err => res.status(400).json('Error: ' + err));
      
    }
  }
  else {
      res.status(400).json('Error: ' + err);
  }
});

/*
, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Result : ", docs);
        }
      }
*/
/*router.delete('/:event_id/delete', function(req, res, next) {
  //res.stat
});*/
module.exports = router;
