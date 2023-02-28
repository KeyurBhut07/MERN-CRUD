const express = require("express");
const router = new express.Router();
const productmodel = require("../model/Product");

router.post("/addproduct", async (req, res) => {
  try {
    const product = await new productmodel(req.body);
    const result = await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/allproducts", async (req, res) => {
  try {
    let result = await productmodel.find();
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No Product Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    let result = await productmodel.deleteOne({ _id: req.params.id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No Product Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    let result = await productmodel.findOne({ _id: req.params.id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No Product Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/updateproduct/:id", async (req, res) => {
  try {
    let result = await productmodel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No Product Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// search by regex
router.get("/searchproduct/:key", async (req, res) => {
  try {
    let result = await productmodel.find({
      $or: [
        { name: { $regex: req.params.key } },
        { price: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
      ],
    });
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No Product Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
