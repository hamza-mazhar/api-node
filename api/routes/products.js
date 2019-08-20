const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(obj => {
          return {
            name: obj.name,
            price: obj.price,
            _id: obj._id
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productId", (req, res) => {
  const id = req.params.productId;
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
    .then(obj => {
      res.status(200).json(obj);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const updateOpt = {};
  for (const opt of req.body) {
    updateOpt[opt.propName] = opt.value;
  }
  Product.update({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
