const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    words: [{
        wordId: {type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true},
        name: {type: String}
    }]
});

userSchema.methods.addWord = function(word) {
// check if word exists if not add, else do not add
}

userSchema.methods.removeWord = function(word) {

}

module.exports = mongoose.model('User', userSchema);