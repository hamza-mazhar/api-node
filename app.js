const express = require("express");
const app = express();
const morgan = require("morgan");
const productsRouter = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");

app.use(morgan("dev"));
app.use("/products", productsRouter);
app.use("/orders", ordersRoutes);
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
