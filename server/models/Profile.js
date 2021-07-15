const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    schedule: [Number],
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