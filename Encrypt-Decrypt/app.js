'use strict'
// If using module.exports we should create a new instance as module.exports is constructor

const Enigma = require('./enigma');
const eng = new Enigma('magrathea'); 

// console.log(eng.hello("Vineel"));

let encodedString = eng.encode("Dont Panic");
let decodedString = eng.decode(encodedString);
console.log("Encoded Version " + encodedString)
console.log("Decoded Version " + decodedString)