const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dataRoutes = require("./routes/dataRoutes");
const env = require("dotenv");
const mongoose = require("mongoose");

env.config({
  path: "./config.env"
});
const app = express();

//this is a gthub test
app.use(bodyParser.json());
app.use(cors());

app.use("/api/data", dataRoutes);

app.listen(3000, () => {
  console.log("server connected succefully!");
});

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Databse Connection Succefull!");
  });
