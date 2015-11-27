var config = module.exports = {};

// Webserver Configurations, First arg in node can be the Port
config.server = {
  host : '0.0.0.0',
  port: process.argv[2] || process.env.PORT || 7000,
};

//Database Connection Configurations used with knex
config.db = {
  connectionLimit : 10,
  host            : '127.0.0.1',
  port            : '3333',
  user            : 'root',
  password        : '',
  database        : 'researchdb'
}

config.secret = '4JFdif93djfkas';
