const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api.js");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

mongoose
  .connect(process.env.ATLAS_CONNECTION_URL, { useNewUrlParser: true })
  .then(() => console.log(`Food Delivery App connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.listen(process.env.PORT, () => {
  console.log("Application is started on PORT = " + process.env.PORT);
});
