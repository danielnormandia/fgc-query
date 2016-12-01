// require engines/packages
var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require('request');
var db = pgp(process.env.DATABASE_URL || 'postgres://danielanormandia@localhost:5432/fgc_query');
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
}));

app.listen(port, function() {   //port awareness function
  console.log('Site is live on port 3000');
});



app.get('/pData/:name', function(req, res) {
  var data = req.params.name;
  db.none(
    "INSERT INTO queries (user_id, term, searchTime, type) VALUES ($1, $2, now(), 'P')",
    [req.session.user.id, data]
    )
    .catch(function (user) {
      res.send('Cannot post query');
    })
    .then(function(user) {
      var playName = req.params.name;
      var result = {
        url: 'http://rank.shoryuken.com/api/player/name/' + playName
      };
      request(result, function(err, resp, body) {
        var body = JSON.parse(body);
        res.send(body);
      });
  });  //convert api data for ajax access
});

app.get('/tData/:name', function(req, res) {
  var data = req.body;
  db.none(
    "INSERT INTO queries (user_id, term, searchTime, type) VALUES ($1, $2, now(), 'T')",
    [req.session.user.id, data]
    )
    .catch(function (user) {
      res.send('Cannot post query');
    })
    .then(function(user) {
      var tourneyName = req.params.name;
      var result = {
        url: 'http://rank.shoryuken.com/api/tournament/name/' + result
      }
      request(result, function(err, resp, body) {
        var body = JSON.parse(body);
        res.send(body);
      });
    });
});

app.get('/', function(req, res) {
  var logged_in;
  var email;
  var user = req.session.user;
  if (user) {
    logged_in = true;
    email = req.session.user.email;
  }
  var data = {
    "logged_in": logged_in,
    "email": email
  }
  console.log(data)
  res.render('home', data);
});

app.get('/signup', function(req, res) { //registration page
  res.render('signup/register');
});

app.get('/player', function(req, res) {
  res.render('player');
});

app.get('/tournament', function(req, res) {
  res.render('tournament');
});

app.get('/user-history', function(req, res) {
  res.render('user-history')
});

app.post('/login', function(req, res) { //bcrypt login comparison shown by Bryan
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
        res.redirect('/');
    } else {
      res.send('Auth Failed. Check email/password.');
    };
    });
  });
});

app.post('player', function(req, res) {

});

app.post('/signup', function(req, res) {  //salting passwords on signup with bcrypt
  var data = req.body;
  bcrypt.hash(data.password, 10, function(err, hash) {
    db.none(
      "INSERT INTO users (name, email, joinDate, password_digest) VALUES ($1, $2, now(), $3)",
      [data.name, data.email, hash]
    )
    .catch(function (user) {
      res.send('Error. User could not be created');
    })
    .then( function() {
      res.send('User created');
    });
  });
});

app.post('/query', function(req, res) {
  var data = req.body;
  db.none(
    "INSERT INTO queries (user_id, term, searchTime) VALUES ( , $1, now())",
    [data.id,     ]
    )
    .catch(function (user) {
      res.send('Cannot post query');
    })
    .then(function(user) {

    });
});







