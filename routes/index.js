var express = require('express');
var router = express.Router();
let mysql = require('mysql');
require('dotenv').config();
var Filter = require('bad-words'),
filter = new Filter();

let pool = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM Messages', (err, rows) => {
    if(err){
      console.error(err.message);
      res.send({error:err});
    } else {
      res.render('index', {title: "Mini Message Board", messages:rows})
    }
  });
});

router.get('/new', function(req,res,next) {
  res.render('form', {title: "Mini Message Board"} )
});

router.post("/new", function(req,res,next){
  if (req.body.user && req.body.message) {
    let cleanMessage = filter.clean(req.body.message);
    let user = req.body.user;
    let added = new Date();

    pool.query(
      'INSERT INTO Messages (text, user, added) VALUES (?, ?, ?)',
      [cleanMessage, user, added],
      (err, results) => {
        if(err){
          console.log('error: ', +err.message);
          res.send({error: err});
        } else {
          console.log('Row inserted:' + results.affectedRows);
          res.redirect('/');
        }
      }
    );

  } else {
    res.status(400).send('Invalid Request');
  }

});

module.exports = router;
