const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    // Grab data from MongoDB
    const ret = {
        valid: true,
        userID: "6f8ada02-4223-40cb-83b9-0b241922e9b7",
        schedule: [[1619891020, 1619906020]]
    }
    // At some point, we'll have to return either 200 or 501
    // depending on whether the user exists or not.
    res.status(200).json({ ret });
});

module.exports = router;
