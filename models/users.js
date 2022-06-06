const mongoose = require("mongoose");
const category = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: {
    type: String,
    required: [true, "Enter the name!"],
  },
  color: String,
});
module.exports = mongoose.model("Category", category);
