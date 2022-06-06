const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const category = require("../models/users.js");

router.get("/category", (req, res) => {
  category.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({
        data: data,
      });
    }
  });
});

router.post("/category", (req, res, next) => {
  const reqBody = req.body;
  let newCategory = new category({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    color: req.body.color,
  });
  newCategory
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Handling POST requests to /category",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        message: "Handling POST requests to /error",
        data: err,
      });
    });
});
router.delete("/category/:id", (req, res) => {
  const iD = req.params.id;
  console.log(iD);
  category
    .findByIdAndDelete({ _id: iD })
    .then((data) => {
      res.status(200).json({
        message: "Deleted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error during delete",
        data: err,
      });
    });
});
router.put("/category/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  category
    .findByIdAndUpdate({ _id: id }, body, { new: true })
    .then((data) => {
      res.status(200).json({
        message: "Successfully updated",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Failed to uodate",
        data: err,
      });
    });
});

module.exports = router;
