const express = require('express');
const { registerSuperAdmin, loginSuperAdmin } = require('../controllers/superAdmin.controller');
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post(
  "/create",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price } = req.body;

      const product = new Product({
        name,
        price,
        image: req.file.filename
      });

      await product.save();

      res.status(201).json({
        message: "Mahsulot qo\'shildi",
        product
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = { productRouter: router };
