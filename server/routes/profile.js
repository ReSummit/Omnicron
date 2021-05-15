const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile.js');

router.get('/:profile_id', function(req, res, next) {
    
    Profile.findById(req.params.profile_id).populate('events').then(
        profile => {
            res.status(200).json(profile);
        }
    );
    
    // Grab data from MongoDB
    //const ret = {
    //    valid: true,
    //    userID: "6f8ada02-4223-40cb-83b9-0b241922e9b7",
    //    schedule: [[1619891020, 1619906020]]
    //}
    // At some point, we'll have to return either 200 or 501
    // depending on whether the user exists or not.
    //res.status(200).json({ profile: Profile.findById(req.params.profile_id).populate() });
    //res.status(200).json({ ret });
});
//Create Profile
router.post('/add', function (req, res) {
    if ( req.body && req.body.name && req.body.schedule) {
        const name = req.body.name;
        const schedule = req.body.schedule;
        const events = [];
    
        const newProfile = new Profile({
            schedule,
            events,
        });
    
        newProfile.save()
            .then(() => res.status(200).json({ status: "Profile Added" }))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        res.status(400).json('Error: ' + err);
    }
});

//Update Profile
router.post('/update/:id', function (req, res) {
    if( req.body && req.body.name && req.body.schedule && req.body.events){
        Profile.findById(req.params.id)
            .then(profile => {
                profile.name = req.body.name;
                profile.schedule = req.body.schedule;
                profile.events = req.body.events;

                profile.save()
                    .then(() => res.status(200).json({ status: 'Exercise updated!' }))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        res.status(400).json('Error: ' + err);
    }
});
module.exports = router;
