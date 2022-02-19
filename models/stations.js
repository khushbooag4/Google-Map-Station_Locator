const mongoose = require("mongoose");
const geocoder = require("../utils/geoCoder");

const StationSchema = new mongoose.Schema(
  {
    operatorName: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], //[latitude , longitude]
        index: "2dsphere",
      },
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
    },
    phoneNumber: { type: Number, required: true, unique: true },
    status: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

StationSchema.pre('save' , async function(next){
  const loc = await geocoder.geocode(this.address);

  this.state = loc[0].stateCode;
  this.location = {
    type: "Point",
    coordinates: [loc[0].latitude, loc[0].longitude],
    latitude : loc[0].latitude,
    longitude : loc[0].longitude
  };

  next();
})

const Station = mongoose.model("Station", StationSchema);

module.exports = Station;
