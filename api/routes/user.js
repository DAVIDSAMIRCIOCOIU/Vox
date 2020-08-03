const express = require('express');
const userController = require("../controllers/user");
const router = express.Router();
const isAuth = require("../../middleware/is-auth");


router.get("/words", isAuth, userController.getWords);

router.post("/add-word", isAuth, userController.addWord);

module.exports = router;