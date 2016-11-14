var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/ParkingApplication');

var UserSchema = Schema({
	displayName :{
		type: String
}

});

//create schema and insert
	var something = db.model('User', UserSchema);
    var someVar = new Something({ displayName: 'sampath' });
    someVar.save(function (err) {
      if (err) // ...
      console.log('meow');
    });
