const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const db = require("./config/mongoose"); // Ensure this exports a mongoose connection
const passportLocal = require("./config/passport-local");
const { setAuthenticatedUser } = require("./config/passport-local");

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "assets")));

// Middleware to parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session configuration
app.use(
  session({
    name: "codial",
    secret: "dont know",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/user", // Ensure this is correct
      autoRemove: "disabled",
    }),
  })
);

// Initialize Passport and configure it to use session
app.use(passport.initialize());
app.use(passport.session());

// Middleware to set authenticated user in response locals
app.use(setAuthenticatedUser);

// Routes
app.use("/", require("./routes"));

// Start the server
app.listen(8002, (err) => {
  if (err) {
    console.log("Error occurred while starting the server:", err);
  } else {
    console.log("Server running on port 8002");
  }
});
