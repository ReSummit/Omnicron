var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = new Schema({
    type     : Boolean
  , period    : [Number]
  , people    : [[Schema.Types.Mixed]]
  , deliberation    : [Number]
  , decided      : Boolean
});
mongoose.model("Event", Event);