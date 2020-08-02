const express = require("express");
const router = express.Router();
const dictionaryController = require("../controllers/dictionary")

router.get("/", dictionaryController.getDictionaryHome);

router.post("/dictionary", dictionaryController.getDictionaryWord);

module.exports = router;
