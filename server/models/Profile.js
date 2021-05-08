var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProfileSchema = new Schema({
    schedule: {
      type: [[Number, Number]],
      required: true
    },
    events: {
        type: [{event_id: String, host: Boolean}],
        required: true
    }
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;