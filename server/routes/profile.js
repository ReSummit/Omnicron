const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile.js');

router.get('/:id', function(req, res, next) {
    Profile.findById(req.params.id).populate("events").then(
        profile => {
            res.status(200).json(profile);
        }
    )
});
//Create Profile
router.post('/add', function (req, res) {
    // if ( req.body && req.body.name && req.body.schedule && req.body.events ) {
        const name = req.body.name;
        const schedule = req.body.schedule;
        const events = req.body.events;
    
        const newProfile = new Profile({
            name,
            schedule,
            events,
        });
    
        newProfile.save()
            .then(() => res.status(200).json({ status: "Profile Added" }))
            .catch(err => res.status(400).json('Error: ' + err));
    // }
    // else {
    //     res.status(400).json('Error: ' + err);
    // }
});

//Update Profile
router.post('/update/:id', function (req, res) {
        Profile.findById(req.params.id)
            .then(profile => {
                profile.name = req.body.name;
                profile.schedule = req.body.schedule;

                profile.save()
                    .then(() => res.status(200).json({ status: 'Exercise updated!' }))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;

