var express = require('express'),
framework = require('./routes/api');

var app = express();
var morgan = require('morgan')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'))

var passport = require('passport');  
app.use (passport.initialize());

var LocalStrategy = require('passport-local').Strategy;
var flash = require ("connect-flash");
app.use (flash());

var allowCrossDomain = function(req, res, next) {
	res.header ("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
	next();
};

app.use(allowCrossDomain);

//tell passport to user local strategy which is 
//password and username login 
passport.use(new LocalStrategy(
  function(username, password, done) {
	  //not using database access right now
	  if (username == "test" && password == "test")
		  done (null, "yes");
	  else
		  done (null, false);
  }
));

app.get('/api/frameworks', framework.findAllFrameworks);
app.get('/api/frameworks/:name', framework.findFrameworkByName);
app.get('/api/frameworks/type/:type', framework.findFrameworkByBusinessType);

app.get('/api/frameworks/:name/controls', framework.findAllFrameworkControls);
app.get('/api/frameworks/:fname/controls/:name', framework.findFrameworkControlByFrameworkNameAndControlName);
app.get('/api/references/:name', framework.findControlsByReference);
app.get('/api/frameworks/controls/like/:description', framework.findSimilarControlsByDescription);
app.get('/api/frameworks/controls/:control/tag/:tag', framework.addTagToControl);
app.get('/api/frameworks/controls/tag/:tag', framework.findControlsByTag);


app.post('/api/login',
  passport.authenticate('local', { successRedirect: '/api/sucess',
  failureRedirect: '/api/failure', session: false})
);

app.listen(3000);
console.log('Listening on port 3000...');