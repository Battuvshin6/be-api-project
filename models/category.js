const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: {
    type: String,
    required: [true, "Enter the name!"],
  },
  color: String,
});

module.exports = mongoose.model("Category", categorySchema);
