var config = module.exports = {};


// Webserver Configurations, First arg in node can be the Port
config.server = {
  host : '0.0.0.0',
  port: process.argv[2] || process.env.PORT || 7000,
};

//Database Pool Configurations
config.db_pool = {
  connectionLimit : 0,
  host            : 'localhost',
  port            : '3333',
  user            : 'root',
  password        : ''
}
