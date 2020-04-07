const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dataRoutes = require("./routes/dataRoutes");
const env = require("dotenv");
const mongoose = require("mongoose");
const compression = require("compression");

env.config({
  path: "./.env",
});
const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.use(
//   express.static(__dirname + "./find-pair/dist/" || __dirname + "/dist/")
// );

// app.get(/.*/, function (req, res) {
//   res.sendFile(
//     __dirname + "./find-pair/dist/index.html" || __dirname + "/dist/index.html"
//   );
// });
app.use("/api/data", dataRoutes);
app.use(compression());
const port = process.env.PORT;

app.listen(port, () => {
  console.log("server connected succefully!");
});

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Databse Connection Succefull!");
  });
