const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("error connecting to db");
});
db.on("open", () => {
  console.log("MongoDB successfully connected");
});

module.exports = db;
