const mongoose = require("mongoose");
const foodModel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category_id: String,
  name: {
    type: String,
    required: [true, "Enter the name!"],
  },
  price: {
    type: Number,
    minimum: 0,
  },
  discount: {
    type: Number,
    minimum: 0,
    default: 0,
  },
  portion: {
    type: Number,
    minimum: 0,
  },
  ingredients: {
    type: String,
    minimum: 0,
  },
  status: Boolean,
  image: String,
  thum_img: String,
  sales: {
    type: Boolean,
    default: Boolean,
  },
});

module.exports = mongoose.model("foodmodels", foodModel);
