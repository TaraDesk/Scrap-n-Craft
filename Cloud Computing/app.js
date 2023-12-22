const express = require("express");
const app = express();
const morgan = require("morgan"); // Morgan pada node.js untuk pencatatan setiap request ke server
const bodyParser = require("body-parser");
const scrapRoutes = require("./routes/scrap");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/scrap", scrapRoutes);

app.use((req, res, next) => {
  const error = new Error("Data Scrap & Craft Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

