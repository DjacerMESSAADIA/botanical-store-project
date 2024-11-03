const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      req.flash("error_msg", "Please fill in all fields");
      return res.redirect("/register");
    }

    if (password !== confirmPassword) {
      req.flash("error_msg", "Passwords do not match");
      return res.redirect("/register");
    }

    if (password.length < 6) {
      req.flash("error_msg", "Password should be at least 6 characters");
      return res.redirect("/register");
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error_msg", "Email is already registered");
      return res.redirect("/register");
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);
    req.flash("error_msg", "An error occurred during registration");
    res.redirect("/register");
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      req.flash("error_msg", "Please fill in all fields");
      return res.redirect("/login");
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error_msg", "Invalid email or password");
      return res.redirect("/login");
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash("error_msg", "Invalid email or password");
      return res.redirect("/login");
    }

    // Create session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    req.flash("success_msg", "You are now logged in");
    res.redirect(user.isAdmin ? "/dashboard" : "/");
  } catch (error) {
    console.error("Login error:", error);
    req.flash("error_msg", "An error occurred during login");
    res.redirect("/login");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.redirect("/");
    }
    res.redirect("/login");
  });
};
