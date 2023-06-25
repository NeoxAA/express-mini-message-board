var express = require('express');
var router = express.Router();
let mysql = require('mysql');


let connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});



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
    connection.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      let cleanMessage = filter.clean(req.body.message);
      messages.push({text: cleanMessage, user: req.body.user, added: new Date()});
      res.redirect('/')
      console.log('Connected to the MySQL server.');
    });

  }
  else {
    console.error("Missing fields");
    res.render('form', {title: "Mini Message Board", errorMessage: "Missing fields"});
  }

})

module.exports = router;
