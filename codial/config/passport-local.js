const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware to set the authenticated user
const setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/user/sign-in");
};

module.exports = {
  setAuthenticatedUser,
  checkAuthentication,
  passport,
};
