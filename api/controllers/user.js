exports.getWords  =(req, res, next) => {
    //query db for user words
    // send back words
    console.log(req.user.words)
    console.log("here")
    res.render("words-list");
}

exports.addWord  =(req, res, next) => {
    //query db for user words
    // send back words
    console.log(req.user.words)
}