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
        uuid: {type: String, required: true},
        name: {type: String, required: true},
        function: {type: String},
        def:[{ type: String}]
    }]
});

userSchema.methods.addWord = function(word) {
// check if word exists if not add, else do not add
    return new Promise((resolve, reject) => {
        let err = false;
        this.words.forEach(w => {
            if(w.uuid == word.uuid) {
                err = true;
               reject(new Error ("Couldn't add word."));
            }
        });
        if(!err) {
            this.words.push(word);
        this.save().then(result => {
            resolve(result)
        });
        } 
    })
}

userSchema.methods.getWords = function() {
    return Promise.resolve(this.words);
}

userSchema.methods.removeWord = function(uuid) {
    let updatedWords = this.words.filter(w => {
       return w.uuid != uuid;
   });
   this.words = updatedWords;
    return this.save()
    .then(result => {
        return Promise.resolve(result)
    })
    .catch(e => {
        return Promise.reject(e)
    })
}

module.exports = mongoose.model('User', userSchema);