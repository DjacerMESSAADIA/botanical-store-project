const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { ensureAuthenticated, ensureGuest } = require("../middleware/auth");

// // Add home route
// router.get("/", (req, res) => {
//   res.render("home");
// });

router.get("/login", ensureGuest, authController.getLogin);
router.post("/login", ensureGuest, authController.postLogin);
router.get("/register", ensureGuest, authController.getRegister);
router.post("/register", ensureGuest, authController.postRegister);
router.get("/logout", ensureAuthenticated, authController.logout);

module.exports = router;
