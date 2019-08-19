const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  Product.find()
    .exec()
    .then(docs => {
      console.log("=============>", docs);
      // if (res.length >= 0) {
      res.status(200).json(docs);
      // } else {
      //   res.status(404).json({
      //     message: "Not get any data"
      //   });
      // }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productId", (req, res) => {
  const id = req.params.productId;
  console.log(id);
  Product.findById(id)
    .exec()
    .then(docs => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "Not get valid id data"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });

  res.status(200).json({
    message: "get products call"
  });
});

router.delete("/", (req, res) => {
  res.status(200).json({
    message: "get products call"
  });
});

router.patch("/", (req, res) => {
  res.status(200).json({
    message: "get products call"
  });
});

module.exports = router;
