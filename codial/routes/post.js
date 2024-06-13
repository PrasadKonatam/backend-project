const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts_controller");
const { checkAuthentication } = require("../config/passport-local");

router.post("/create", checkAuthentication, postController.create);
router.get("/destroy/:id", checkAuthentication, postController.destroy);

module.exports = router;
