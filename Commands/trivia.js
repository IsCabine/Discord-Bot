const Trivia = require('trivia-api')
const trivia = new Trivia(***REMOVED*** encoding: 'url3986' ***REMOVED***);

module.exports.run = (e, args) => ***REMOVED***
    trivia.getQuestions()
        .then(questions => console.log(questions))
***REMOVED***;