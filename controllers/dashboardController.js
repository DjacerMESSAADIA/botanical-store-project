const Product = require("../models/Product");
const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    const users = await User.find().sort({ createdAt: -1 });
    res.render("dashboard", { products, users });
  } catch (error) {
    console.error("Dashboard error:", error);
    req.flash("error_msg", "Error loading dashboard");
    res.redirect("/");
  }
};

// Product management
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;
    await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
    });
    req.flash("success_msg", "Product added successfully");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Create product error:", error);
    req.flash("error_msg", "Error creating product");
    res.redirect("/dashboard");
  }
};

exports.getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("error_msg", "Product not found");
      return res.redirect("/dashboard");
    }
    res.render("edit-product", { product });
  } catch (error) {
    console.error("Get edit product error:", error);
    req.flash("error_msg", "Error loading product");
    res.redirect("/dashboard");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      image,
      isOnSale,
      salePrice,
    } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      req.flash("error_msg", "Product not found");
      return res.redirect("/dashboard");
    }

    const updates = {
      name,
      description,
      price,
      category,
      stock,
      image,
      isOnSale: isOnSale === "on",
      salePrice: isOnSale === "on" ? salePrice : undefined,
    };

    await Product.findByIdAndUpdate(req.params.id, updates);
    req.flash("success_msg", "Product updated successfully");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Update product error:", error);
    req.flash("error_msg", "Error updating product");
    res.redirect("/dashboard");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      req.flash("error_msg", "Product not found");
      return res.redirect("/dashboard");
    }

    await Product.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Product deleted successfully");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Delete product error:", error);
    req.flash("error_msg", "Error deleting product");
    res.redirect("/dashboard");
  }
};

// User management
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    await User.create({
      name,
      email,
      password,
      isAdmin: isAdmin === "on",
    });
    req.flash("success_msg", "User added successfully");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Create user error:", error);
    req.flash("error_msg", "Error creating user");
    res.redirect("/dashboard");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Prevent deleting the last admin
    if (user.isAdmin) {
      const adminCount = await User.countDocuments({ isAdmin: true });
      if (adminCount <= 1) {
        req.flash("error_msg", "Cannot delete the last admin user");
        return res.redirect("/dashboard");
      }
    }

    await User.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "User deleted successfully");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Delete user error:", error);
    req.flash("error_msg", "Error deleting user");
    res.redirect("/dashboard");
  }
};
