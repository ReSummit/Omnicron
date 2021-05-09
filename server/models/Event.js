var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new Schema(
{
  event_type: {
    type: Boolean,
    required: true
  },
  people: {
    type: [{profile: String, confirmed: Boolean, host: Boolean}],
    required: true
  },
  deliberation: {
    type: {start: Number, end: Number},
    required: true
  }, 
  decided: {
    type: Boolean,
    required: true
  }
});

const Event = mongoose.model("Event", EventSchema);

module.export = Event;
