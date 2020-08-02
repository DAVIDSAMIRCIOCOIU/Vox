const express = require("express");
const router = express.Router();
const dictionaryController = require("../controllers/dictionary")

router.get("/", dictionaryController.getDictionaryHome);

router.post("/", dictionaryController.getDictionaryWord);

module.exports = router;
