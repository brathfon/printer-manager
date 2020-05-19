#!/usr/bin/env node

var crypto = require('crypto');

if (process.argv.length != 3) {
  console.log("Usage: pw-gen.js <password>")
  process.exit(1);
}

var password = process.argv[2];

console.log("PW : " , password);


var createSaltAndHash = function(password) {
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');
  return ({'salt' : salt, 'hash' : hash});
};

var saltAndHash = createSaltAndHash(password);

console.log("salt : ", saltAndHash.salt);
console.log("hash : ", saltAndHash.hash);
