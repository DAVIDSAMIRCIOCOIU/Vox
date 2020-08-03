const express = require('express');
const userController = require("../controllers/user");
const isAuth = require("../../middleware/is-auth");
const router = express.Router();

router.get("/words", isAuth, userController.getWords);

router.post("/add-word", isAuth, userController.addWord);

router.delete("/add-word/:uuid", isAuth, userController.deleteWord);

module.exports = router;