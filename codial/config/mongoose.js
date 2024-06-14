const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://user2:user2@cluster0.kawtfaw.mongodb.net/");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("error connecting to db");
});
db.on("open", () => {
  console.log("MongoDB successfully connected");
});

module.exports = db;

// require("dotenv").config();
// const mongoose = require("mongoose");

// const mongoURI =
//   process.env.MONGODB_URI ||
//   "mongodb+srv://prasadkonatam96:prasad@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority";

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true, // Add this line if you encounter deprecation warnings
//   useFindAndModify: false, // Add this line if you encounter deprecation warnings
//   ssl: true, // Ensure SSL is enabled
//   tlsInsecure: true, // You can set this to false in production
// });

// const db = mongoose.connection;

// db.on("error", (err) => {
//   console.error("Error connecting to the database:", err);
// });
// db.once("open", () => {
//   console.log("Successfully connected to the database");
// });

// module.exports = db;
