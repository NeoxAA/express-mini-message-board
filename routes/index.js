var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
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
  res.render('form', {title: "Add new message"} )
});

router.post("/new", function(req,res,next){
  if (req.body.user && req.body.message) {
    messages.push({text:req.body.message, user:req.body.user, added:new Date()});
    res.redirect('/')
  }
  else {
    console.error("Missing fields");
    res.render('form', {title: "Add new message", errorMessage: "Missing fields"});
  }

})

module.exports = router;
