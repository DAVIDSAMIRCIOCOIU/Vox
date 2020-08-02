const axios = require("axios");

exports.getDictionaryHome = (req, res, next) => {
  res.render("dictionary", {type: null, data: null})
};


exports.getDictionaryWord = (req, res, next) => {
  // Get the word from the API
  // Make a request for a user with a given ID
  axios
    .get(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${req.body.word}?key=${process.env.DICTIONARY_API_KEY}`,
      { timeout: 9000 }
    )
    /**Response might be given in 3 formats: error: string, incorrect word: [string], correct word: [{}] */
    .then(function (response) {
      console.log(response.data)
      if (typeof response.data == "object") {
        // found a word or suggestions
        if (typeof response.data[0] == "object") {
          // found words
          return res.render("dictionary", { type: "words", data: response.data });
        } else if (typeof response.data[0] == "string") {
          
          // found suggestions
          return res.render("dictionary", { type: "suggestions", data: response.data });
        }
      } else if (typeof response.data == "string") {
        // error
        return res.render("dictionary", { type: "error", data: "Invalid word"});
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      console.log("in error");
    });
};
