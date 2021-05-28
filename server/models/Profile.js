const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: String,
    schedule: [[Number, Number]],
    events: [{
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
      },
      host: Boolean
    }]
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;