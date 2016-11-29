var express = require("express");
var app = express();
var pgp = require('pg-promise')();
var mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = pgp(process.env.DATABASE_URL ||'postgres://danielanormandia@localhost:5432/');
var port = process.env.PORT || 3000;

var session = require('express-session');

var bcrypt = require('bcrypt');
var salt = bcrypt.genSalt(10);

app.engine('html', mustacheExpress());
app.set('view engine','html');
app.set('views', __dirname + '/views');
app.use('/', express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.listen(port, function() {
  console.log('Site is live on port 3000');
});

app.get('/home', function(req, res) {
    var data = {
      'logged_in': false,
      'email': 'test@test.com'
    }

    res.render('home', data);
})

app.post('/login', function(req, res) {
  var data = req.body;
  db.one(
    "SELECT * FROM users WHERE email = $1",
    [data.email]
  )
  .catch(function(user) {
    res.send('Auth Failed, Check email/password.');
  })
  .then(function(user) {
    bcrypt.compare(data.password, user.password_digest, function(err, cmp) {
    if (cmp) {
        req.session.user = user;
        res.redirect('/home');
    } else {
      res.send('Auth Failed. Check email/password.')
    }
    })
  })
})

app.get('/signup', function(req, res) {
  res.render('signup/register');
})

app.post('/signup', function(req, res) {
  var data = req.body;
  bcrypt.hash(data.password, 10, function(err, hash) {
    db.none(
      "INSERT INTO users (name, email, joinDate, password_digest) VALUES ($1, $2, $3, $4)",
      [data.name, data.email, NOW(), hash]
    )
    .catch(function (user) {
      res.send('Error. User could not be created');
    })
    .then( function() {
      res.send('User created');
    })
  })
})









