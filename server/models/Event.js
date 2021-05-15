var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new Schema(
{
  event_name: {
    type: String,
  },
  repeating: {
    type: Boolean,
    required: true
  },
  people: {
    type: [{profile: String, confirmed: Boolean, host: Boolean}],
    required: true
  },
  time: {
    type: {start: Number, end: Number},
    required: true
  }, 
  decided: {
    type: Boolean,
    required: true
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
