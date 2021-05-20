const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
{
  name: String,
  repeating: Boolean,
  people: [{
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile"
    },
    confirmed: Boolean,
    host: Boolean
  }],
  time: {
    start: Number,
    end: Number
  }, 
  decided: Boolean
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
