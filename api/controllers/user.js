exports.getWords  =(req, res, next) => {
    //query db for user words
    // send back words
    console.log(req.user.words)
    req.user.getWords()
    .then(words => {
        res.status(200).render("wordsList", {words: words});
    })
    .catch(error => {
        console.log(error)
        res.status(500).redirect("/");
    });
}

exports.addWord  = (req, res, next) => {
    //query db for user words
    // send back words
    const word = {
        uuid: req.body.uuid,
        name: req.body.wordName,
        function: req.body.wordFunction,
        def: JSON.parse(req.body.definition)
    }
    req.user.addWord(word).then(response => {
        return res.status(200).redirect("/user/words");
    }).catch(error => {
        res.status(500).redirect("/");
    })
}

exports.deleteWord = (req, res, next) => {
    req.user.removeWord(req.params.uuid)
    .then(result => {
        res.status(200).redirect("/user/words");
    })
    .catch(error => {
        res.status(500).redirect("/")
    })
}