const mongoose= require('mongoose');
const Schema = mongoose.Schema;

//either here or in mongoose.connect mention within there in {} //depriciated warning issue solve
//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
//mongoose.set('useUnifiedTopology', true);

//create geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    createIndexes: "2dsphere"
  }
});

//#create wizard schema & model
const wizardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },

  rank: {
    type: String,
  },

  available: {
    type: Boolean,
    default: false
  },

//mapping GeoSchema
  geometry: GeoSchema
});

const Wizard = mongoose.model('wizard',wizardSchema);

module.exports = Wizard;
