var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//this is the error. Try to solve by getting the db connection
//globally and use that to insert or get
var db = mongoose.connect('mongodb://localhost/ParkingApplication');

/*  If not signed in  */
router.use('/', function(req,res,next){
	if(!req.user){
		res.redirect("/");
	}
	next();
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.end(db.users.find())
  });


module.exports = router;


