var express = require('express');
var router = express.Router();

var Filter = require('bad-words'),
filter = new Filter();

const messages = [
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Mini Message Board", messages: messages })
});

router.get('/new', function(req,res,next) {
  res.render('form', {title: "Mini Message Board"} )
});

router.post("/new", function(req,res,next){
  if (req.body.user && req.body.message) {
    let cleanMessage = filter.clean(req.body.message);
    messages.push({text: cleanMessage, user: req.body.user, added: new Date()});
    res.redirect('/')
  }
  else {
    console.error("Missing fields");
    res.render('form', {title: "Mini Message Board", errorMessage: "Missing fields"});
  }

})

module.exports = router;
