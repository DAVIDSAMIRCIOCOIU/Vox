const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    }
});

module.exports = mongoose.model("Word", wordSchema);