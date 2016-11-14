'use strict'
const crypto = require('crypto')
// exports.hello = (user)=>{
// 	return "Hello " + user;
// }


// The above representation is same as the below 

// exports.hello = function(user){
// 	return "Hello " + user;
// }


module.exports = function(key){   // module.exports overwritws exports
	this.key = key;
	return {
		encode: (str) => {
			let encoder = crypto.createCipher('aes-256-ctr',this.key);
			return encoder.update(str,'utf8','hex');
		},
		decode: (str)=>{
			let decoder = crypto.createDecipher('aes-256-ctr',this.key);
			return decoder.update(str,'hex','utf8');
		}
	}
}