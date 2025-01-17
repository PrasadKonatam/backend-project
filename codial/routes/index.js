const express = require("express");
const router = express.Router();
const homecontroller = require("../controllers/home_controller");

router.get("/", homecontroller.home);
router.use("/user", require("./user"));
router.use("/posts", require("./post"));
router.use("/comments", require("./comment"));

module.exports = router;
