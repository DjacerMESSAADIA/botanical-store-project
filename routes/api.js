const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/products", productController.getProductsApi);
router.get("/products/:id", productController.getProductByIdApi);

module.exports = router;
