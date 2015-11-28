//Define schema
var caminte = require('caminte');
var config = require('../../config');
Schema = caminte.Schema;
var schema = new Schema(config.db.driver, config.db);


var Permission = schema.define('Permissions', {
  permissions_id : { type: schema.String, limit: 64},
  level: { type: schema.String, limit: 45}
}, {
  primaryKeys: ["permissions_id"]
});


//Define Models
var User = schema.define('Users', {
  users_id : { type: schema.String, limit: 64, default: '0'},
  fName: { type: schema.String, limit: 45},
  lName: { type: schema.String, limit: 45},
  username: { type: schema.String, limit: 45},
  pass_hash: { type: schema.String, limit: 255},
  email: { type: schema.String, limit: 64},
  permissions_fk: {type: schema.String, limit: 64, default: '0'}
}, {
  primaryKeys: ["userID"]
});

var Paper = schema.define('Papers', {
  papers_id : { type: schema.String, limit: 64},
  title: { type: schema.String, limit: 45},
  abstract: { type: schema.Text},
  citation: { type: schema.String, limit: 45}
}, {
  primaryKeys: ["paper_ID"]
});


User.hasMany(Paper, {as: 'papers', foreignKey: 'user_id'});
Paper.belongsTo(User, {as: 'users', foreignKey: 'user_id'});

//User.hasMany(Permission, {as: 'permissions', foreignKey: 'permissions_fk'});
//Paper.belongsTo(User, {as: 'users', foreignKey: 'user_id'});



//Test Save
var user = new User;
user.save(function (err) {
  if (err) {throw err};
    var paper = user.papers.build({
      papers_id : '0',
      title: 'Hello world',
      abstract: 'Abstract',
      citation: 'citation'
    });
    paper.save(console.log);
});

module.exports = schema;
