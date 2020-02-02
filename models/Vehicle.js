const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  car_make: { type: String, required: true },
  car_model: String,
  car_year: String,
  vin: { type: String, unique: true },
  MSRP: String,
  photo: String,
  purchase_date: String,
  purchaser_name: String,
  purchaser_email: String,
  price: String,
  car_color: String,
  country: String
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
