// getting google Strategy
 var passport = require('passport');
 var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

 module.exports = function(){
 	 // identifying the app
 passport.use(new GoogleStrategy({
 	clientID : '942639518096-q8ub4t41l3vn5p1a7tebvd7ljq3soqru.apps.googleusercontent.com',
 	clientSecret: 'OvsNOtbdvdGmeBx65fkqIZNZ',
 	callbackURL:'http://localhost:3000/auth/google/callback/'
    },
 	function(req, accessToken, refreshToken, profile,done){

 		var user={};
 		user.email = profile.emails[0];
 		user.image = profile._json.image.url;
 		user.displayName = profile.displayName;
 		user.google={};
 		user.google.id = profile.id;
 		user.google.token = accessToken;
 		done(null,user); // now routes have access
 	}

 ));
};