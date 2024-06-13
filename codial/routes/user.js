const express = require("express");
const router = express.Router();
const { passport, checkAuthentication } = require("../config/passport-local");
const usercontroller = require("../controllers/users_controller");

router.get("/profile", checkAuthentication, usercontroller.profile);
router.get("/sign-up", usercontroller.signUP);
router.get("/sign-in", usercontroller.signIn);
router.post("/create", usercontroller.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
  usercontroller.createSession
);
router.get("/sign-out", usercontroller.signOut);
router.get("/register", usercontroller.register);

module.exports = router;
