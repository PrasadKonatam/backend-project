const User = require("../models/user");
const passport = require("passport");

module.exports.create = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const createdUser = await User.create(req.body);
    res.redirect("/user/sign-in");
  } catch (err) {
    console.error("Error:", err);
    res.redirect("back");
  }
};

// module.exports.createSession = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       if (req.body.password != user.password) {
//         return res.redirect("back");
//       }
//       res.cookie("user_id", user.id);
//       return res.redirect("/user/profile");
//     }
//   } catch (err) {
//     console.log("error in finding user in createSession");
//   }
// };

module.exports.profile = async (req, res) => {
  try {
    // Using req.user to get the authenticated user
    const user = req.user;
    if (user) {
      // Pass user data to the view
      return res.render("user_profile", {
        title: "User Profile",
        user: user,
      });
    }
  } catch (error) {
    console.error("Error in fetching user profile:", error);
    // return res.redirect(302, "sign-in");
  }
};

module.exports.signUP = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_sign_up", {
    title: "codial | sign Up",
  });
};

module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_sign_in", {
    title: "codial | sign In",
  });
};

module.exports.signOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("codial");
      res.redirect("/");
    });
  });
};

module.exports.register = (req, res) => {
  res.redirect("/user/sign-up");
};

module.exports.createSession = (req, res) => {
  res.redirect("/");
};
