var passport = require('passport');

module.exports = function(app){
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user,done){
	done(null,user);
});  // passport places the user object into the session

passport.deserializeUser(function(user,done){
	done(null,user);
});  // remove user from session

// calling google strategy
require('./strategies/google.strategy.js')();  // as strategy.js returns as funct we exexute it
require('./strategies/facebook.strategy')();
};