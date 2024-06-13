// controllers/homeController.js
const User = require("../models/user"); // Ensure the User model is imported
const Post = require("../models/post");

const Comment = require("../models/comment"); // Ensure the Comment model is imported

module.exports.home = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user") // Populate the user field in the Post schema
      .populate({
        path: "comments",
        populate: {
          path: "user", // Populate the user field in the Comment schema
        },
      });

    return res.render("home", {
      title: "Home",
      posts: posts,
      isAuthenticated: req.isAuthenticated(),
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).send("Internal Server Error");
  }
};
