var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(){
passport.use(new FacebookStrategy({
    clientID: '974189139393938',
    clientSecret: '016503f5fdfc0ff477c6da56c5b6836e',
    callbackURL: 'http://localhost:3000/auth/facebook/callback/',
    passReqToCallback:true
  },
  function(req,accessToken, refreshToken, profile, done) {
  	var user={};
    user.email = profile.emails[0].value;
    user.displayName = profile.displayName;
    user.facebook = {};
    user.facebook.id = profile.id;
    user.facebook.token = accessToken;
    done(null,user)
  }
));
};