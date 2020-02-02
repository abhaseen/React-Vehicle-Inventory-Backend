const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// @route /api/
// @desc Get all vehicles
// GET all
router.get("/", function(req, res) {
  Vehicle.find({})
    .limit(20)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => res.status(400).json(err));
});

// @route /api/:id
// @desc Get one by ID
// GET one
router.get("/:id", function(req, res) {
  Vehicle.findById(req.params.id, (error, item) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json(item);
    }
  });
});

// @route /api/add
// @desc Create a new vehicle
// POST
router.post("/add", function(req, res) {
  const {
    car_make,
    car_model,
    car_year,
    vin,
    MSRP,
    photo,
    purchase_date,
    purchaser_name,
    purchaser_email,
    price,
    car_color,
    country
  } = req.body;

  const newVehicle = new Vehicle({
    car_make,
    car_model,
    car_year,
    vin,
    MSRP,
    photo,
    purchase_date,
    purchaser_name,
    purchaser_email,
    price,
    car_color,
    country
  });

  newVehicle.save((err, item) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json(item);
    }
  });
});

// @route /api/edit/:id
// @desc Update an existing vehicle
// PUT
router.put("/edit/:id", function(req, res) {
  Vehicle.findByIdAndUpdate(
    req.params.id,
    {
      car_make: req.body.car_make,
      car_model: req.body.car_model,
      car_year: req.body.car_year,
      vin: req.body.vin,
      MSRP: req.body.MSRP,
      photo: req.body.photo,
      purchase_date: req.body.purchase_date,
      purchaser_name: req.body.purchaser_name,
      purchaser_email: req.body.purchaser_email,
      price: req.body.price,
      car_color: req.body.car_color,
      country: req.body.country
    },
    { new: true },
    (error, item) => {
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json(item);
      }
    }
  );
});

// @route /api/delete/:id
// @desc Delete an existing vehicle
// DELETE
router.delete("/delete/:id", function(req, res) {
  Vehicle.findByIdAndDelete(req.params.id, (error, item) => {
    if (error) {
      return res.json(error);
    }
    return res.json("Item removed.");
  });
});

module.exports = router;
