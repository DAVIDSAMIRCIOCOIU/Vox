const express = require('express');
const userController = require("../controllers/user");
const router = express.Router();
const isAuth = require("../../middleware/is-auth");


router.get("/user/words", isAuth, userController.getWords);

router.post("/user/add-word", isAuth, userController.addWord);

module.exports = router;