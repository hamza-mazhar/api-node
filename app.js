const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const productsRouter = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");
const mongoose = require("mongoose");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Mthods", "PUT,GET,POST,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productsRouter);
app.use("/orders", ordersRoutes);

mongoose.Promise = global.Promise;

mongoose.connect(
  `mongodb://node-shop:hamza123@ds211268.mlab.com:11268/node-shop`,
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  console.log("node is running....");
  res.status(200).json({
    message: "it's work"
  });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  res.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    message: error.message
  });
});

module.exports = app;
