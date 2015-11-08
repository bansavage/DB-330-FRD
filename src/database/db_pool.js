var config = require('../config');
var mysql = require('mysql');
var db_pool = module.exports = {};

db_pool = mysql.createPool(config.db);
