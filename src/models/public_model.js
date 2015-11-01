var Model = require('./model.js');

var Public(){
  var public = {};

  public.__proto__ = Model();

  //functionality here

  return public;
}

module.exports = Public;
