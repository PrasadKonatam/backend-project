const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();

      res.redirect("/");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error("Error creating comment:", err);
    res.redirect("/");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("user");

    if (!comment) {
      console.error("Comment not found");
      return res.redirect("back");
    }

    // Check if the logged-in user is the owner of the comment
    if (comment.user._id.toString() === req.user._id.toString()) {
      await Comment.deleteOne({ _id: req.params.id });
      await Post.updateOne(
        { _id: comment.post },
        { $pull: { comments: req.params.id } }
      );
      console.log("Comment deleted successfully");
      return res.redirect("back");
    } else {
      console.error("User is not authorized to delete this comment");
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error deleting comment:", err);
    return res.redirect("back");
  }
};
