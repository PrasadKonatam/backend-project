const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      user: req.user._id, // Assuming posts should be linked to the user who created them
    });

    await newPost.save(); // Save the new post to the database

    res.redirect("back"); // Redirect the user back to the previous page after successful creation
  } catch (err) {
    console.error("Error while creating post:", err);
    res.status(500).send("Internal Server Error"); // Send a 500 status and an error message if something goes wrong
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.error("Post not found");
      return res.redirect("back");
    }

    console.log("Post found:", post);
    console.log(
      "Post user ID:",
      post.user ? post.user.toString() : "undefined"
    );
    console.log(
      "Logged-in user ID:",
      req.user ? req.user._id.toString() : "undefined"
    );

    if (post.user && post.user.toString() === req.user._id.toString()) {
      await Post.deleteOne({ _id: req.params.id });
      await Comment.deleteMany({ post: req.params.id });
      console.log("Post and associated comments deleted");
      return res.redirect("back");
    } else {
      console.error("User is not authorized to delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error deleting post:", err);
    return res.redirect("back");
  }
};
