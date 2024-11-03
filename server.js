const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

const app = express();

// Database connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/botanical-store"
);

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(flash());

// Global variables middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
app.use("/", require("./routes/main"));
app.use("/", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
