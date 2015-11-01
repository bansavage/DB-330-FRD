var config = module.exports = {};

// Webserver Configurations
config.server = {
  host : '0.0.0.0'
  port: process.env.PORT || 7000
};

//Database Pool Configurations
config.db_pool = {
  connectionLimit : 0,
  host            : 'localhost',
  port            : '3333'
  user            : 'root',
  password        : ''
}
