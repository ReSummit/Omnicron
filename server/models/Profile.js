var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    schedule: {
      type: [[Number, Number]],
      required: true
    },
    events: {
        type: [{event: { type: Schema.Types.ObjectId, ref: 'Event' }, host: Boolean}],
    }
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;