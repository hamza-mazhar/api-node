const express = require("express");
const router = express.Router();
const Order = require("../../models/order");
const mongoose = require("mongoose");
const Product = require("../../models/product");
const checkAuth = require("../middleware/middleware");

router.get("/", checkAuth, (req, res) => {
  Order.find()
    .select("quantity product _id")
    .populate("product", "name price")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        Orders: docs.map(obj => {
          return {
            quantity: obj.quantity,
            product: obj.product,
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

router.get("/:OrderId", checkAuth, (req, res) => {
  const id = req.params.OrderId;
  Order.findById(id)
    .populate("product")
    .exec()
    .then(docs => {
      if (!docs) {
        return res.status(404).json({
          message: "Not get valid id data"
        });
      }
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", checkAuth, (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product)
        return res.status(404).json({
          message: "Not found"
        });
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
      });
      return order.save().then(obj => {
        res.status(200).json(obj);
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:id", checkAuth, (req, res) => {
  const id = req.params.id;
  Order.remove({ _id: id })
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

router.patch("/:id", checkAuth, (req, res) => {
  const id = req.params.id;
  const updateOpt = {};
  for (const opt of req.body) {
    updateOpt[opt.propName] = opt.value;
  }
  Order.update({ _id: id })
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
