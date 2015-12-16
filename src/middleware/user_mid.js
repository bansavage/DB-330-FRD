var mysql = require('mysql');
var config = require('../../config');
var user_model = require('../models/user_model');
var db = require('../database/db_pool');

function User(){

  //Determines whether a user exists based on the username or email
  //If the user exists it will return back the following user info
  //users_id, fName, lName, pass_hash, salt, email, permissions_fk
  this.exist = function(obj, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
        if (obj.username !== undefined){
          var sql = `SELECT ??,??,??,??,??,??,?? FROM ${config.db.database}.users where username = ?`;
          var inserts = ['users_id','fName','lName','pass_hash','salt','email','permission', obj.username];
          sql = mysql.format(sql, inserts);
        }else if (obj.email !== undefined){
          var sql = `SELECT ??,??,??,??,??,??,?? FROM ${config.db.database}.users where email = ?`;
          var inserts = ['users_id','fName','lName','pass_hash','salt','email','permission', obj.email];
          sql = mysql.format(sql, inserts);
        }else if (obj.users_id !== undefined){
          var sql = `SELECT ??,??,??,??,??,??,?? FROM ${config.db.database}.users where users_id = ?`;
          var inserts = ['users_id','fName','lName','pass_hash','salt','email','permission', obj.users_id];
          sql = mysql.format(sql, inserts);
        }else{
          throw new Error('No id or username provided');
        }
        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}
            var user = rows[0];
            if (user == undefined) {throw new Error('No row data');}

            callback('', user);
            connection.release();
          }catch (err){

            console.log(err);
            connection.release();
            callback(err, {});
          }
        });
      }catch(err){
          console.log(err);
          callback(err, {});
      }
    });
  },

  //Returns all papers this user has based on the username or users_id
  this.getPapers = function(obj, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
        if (obj.permission == undefined){
            obj.permission = "public";
        }
        console.log(obj.permission);

        if (obj.permission == "admin"){
          var sql = `select ??, ??, ??, ?? from ${config.db.database}.users
                      inner join ${config.db.database}.papers_users_map
                      on users.users_id = papers_users_map.users_fk
                      inner join ${config.db.database}.papers
                      on papers.papers_id = papers_users_map.papers_fk
                      group by papers.papers_id
                      order by papers.title`;
          var inserts = ['papers_id','title','abstract','citation'];
          sql = mysql.format(sql, inserts);
        }else if (obj.users_id !== undefined){
          var sql = `select ??, ??, ??, ?? from ${config.db.database}.users
                      inner join ${config.db.database}.papers_users_map
                      on users.users_id = papers_users_map.users_fk
                      inner join ${config.db.database}.papers
                      on papers.papers_id = papers_users_map.papers_fk
                      where users_id = ?
                      group by papers.papers_id
                      order by papers.title`;
          var inserts = ['papers_id','title','abstract','citation', obj.users_id];
          sql = mysql.format(sql, inserts);
        }else if (obj.username !== undefined){
          var sql = `select ??, ??, ??, ?? from ${config.db.database}.users
                      inner join ${config.db.database}.papers_users_map
                      on users.users_id = papers_users_map.users_fk
                      inner join ${config.db.database}.papers
                      on papers.papers_id = papers_users_map.papers_fk
                      where username = ?
                      group by papers.papers_id
                      order by papers.title`;
          var inserts = ['papers_id','title','abstract','citation', obj.username];
          sql = mysql.format(sql, inserts);
        }else{
          throw new Error('No id or username provided');
        }

        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}

            if (rows[0] == undefined) {throw new Error('No row data');}  //Indicates there is at least one entry
            var papers = [];
            rows.forEach(function(val){
              papers.push(val);
            });

            callback('', papers);
            connection.release();
          }catch (err){

            console.log(err);
            connection.release();
            callback(err, {});
          }
        });
      }catch(err){
          console.log(err);
          callback(err, {});
      }
    });
  },

  //Gets all of the users, only grabs first name, last name, and users_id
  this.getAllUsers = function(obj, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
        var sql = `SELECT ??,??,?? FROM ${config.db.database}.users`;
        var inserts = ['users_id','fName','lName'];
        sql = mysql.format(sql, inserts);

        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}
            callback('', rows);
            connection.release();
          }catch (err){
            console.log(err);
            connection.release();
            callback(err, {});
          }
        });
      }catch(err){
          console.log(err);
          callback(err, {});
      }
    });
  }
}

module.exports = new User();

//
