var config = require('../../config');
var mysql = require('mysql');

db_pool = mysql.createPool(config.db);

module.exports = db_pool;
