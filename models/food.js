const mongoose = require("mongoose");
const food = mongoose.Schema({
  sales: Boolean,
  _id: mongoose.Schema.Types.ObjectId,
  category_id: {
    type: String,
  },
  name: String,
  price: Number,
  portion: Number,
  stock: Number,
  Image: String,
  tumb_img: String,
  ingredients: String,
  discount: Number,
  category: String,
});

module.exports = mongoose.model("Food", food);
