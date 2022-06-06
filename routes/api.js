const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const category = require("../models/category.js");
const food = require("../models/food.js");

router.get("/category", (req, res) => {
  category.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({
        success: true,
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

// FOOD
router.get("/food", (req, res) => {
  food.find({}, (err, data) => {
    if (err) {
      throw err;
    } else {
      return res.json({
        success: true,
        data: data,
      });
    }
  });
});

router.post("/food", (req, res) => {
  const body = req.body;
  let newFood = new food({
    sales: req.body.sales,
    _id: new mongoose.Types.ObjectId(),
    category_id: req.body.category_id,
    name: req.body.name,
    price: req.body.price,
    portion: req.body.portion,
    stock: req.body.stock,
    image: req.body.image,
    tumb_img: req.body.tumb_img,
    ingredients: req.body.ingredients,
    discount: req.body.discount,
    category: req.body.category,
  });
  newFood
    .save()
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(201).json({
        message: "Handling POST requests to /error",
        data: err,
      });
    });
});

router.delete("/food/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  food
    .findByIdAndDelete({ _id: id }, { new: true })
    .then((data) => {
      res.status(200).json({
        success: false,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        sucess: false,
        data: err,
      });
    });
});
router.put("/food/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  food
    .findOneAndUpdate({ _id: id }, body, {
      new: true,
    })
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        data: err,
      });
    });
});

module.exports = router;
