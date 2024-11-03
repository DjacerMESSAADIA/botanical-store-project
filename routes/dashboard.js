const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth");

router.use(ensureAuthenticated, ensureAdmin);

// Dashboard main route
router.get("/", dashboardController.getDashboard);

// Product routes
router.get("/products/:id/edit", dashboardController.getEditProduct);
router.post("/products", dashboardController.createProduct);
router.put("/products/:id", dashboardController.updateProduct);
router.delete("/products/:id", dashboardController.deleteProduct);

// User routes
router.post("/users", dashboardController.createUser);
router.delete("/users/:id", dashboardController.deleteUser);

module.exports = router;
