const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "get products call"
  });
});

router.get("/:productId", (req, res) => {
  console.log(this.param.productId);
  res.status(200).json({
    message: "get products call"
  });
});

router.post("/", (req, res) => {
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
