var mysql = require('mysql');
var config = require('../../config');
var user_model = require('../models/user_model');
var db = require('../database/db_pool');

function Paper(){
  //Determines whether a user exists,
  this.exist = function(obj, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
        // Use the connection
        if (obj.username !== undefined){
          var sql = `SELECT ??,??,??,?? FROM ${config.db.database}.papers where papers_id = ?`;
          var inserts = ['papers_id','title','abstract','citation', obj.papers_id];
          sql = mysql.format(sql, inserts);
        }else{
          throw new Error('No paper id provided');
        }

        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}
            var paper = rows[0];
            if (paper == undefined) {throw new Error('No row data');}
            //var new_user = new user_model({user});
            //self.data = rows;
            callback('', paper); // All values have been set
            connection.release();
          }catch (err){
            //Create new object attib if no data is found

            console.log(err);
            connection.release();
            callback(err, {});
          }
        });
      }catch(err){
          console.log(err);
      }
    });
  },

  //Gets all keywords for a given paper based on paper id
  //This includes searchable keywords, and paper keywords
  this.getKeywords = function(obj, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
        // Use the connection
        if (obj.papers_id !== undefined){
          var sql = `select ??, ?? from ${config.db.database}.papers
                      inner join ${config.db.database}.paper_keywords
                      on papers.papers_id = paper_keywords.papers_fk
                      inner join ${config.db.database}.searchable_keywords
                      on searchable_keywords.searchable_keywords_id = paper_keywords.searchable_keywords_fk
                      where papers.papers_id = ?`;
          var inserts = ['keyword','searchable_keywords', obj.papers_id];
          sql = mysql.format(sql, inserts);
        }else{
          throw new Error('No paper id provided');
        }

        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}
            var data = rows[0];
            if (data == undefined) {throw new Error('No row data');} // Indicates there is at least one keyword
            var keywords = [];
            rows.forEach(function(obj){
              keywords.push(obj.keyword);
              keywords.push(obj.searchable_keywords);
            });
            callback('', keywords);

            connection.release();
          }catch (err){
            console.log(err);
            connection.release();
            callback(err, {});
          }
        });
      }catch(err){
          console.log(err);
      }
    });
  },

  //Given a paper id this will return an array of user objects with firstname and lastname
  this.getAuthors = function(obj, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
        // Use the connection
        if (obj.papers_id !== undefined){
          var sql = `select ??, ?? from ${config.db.database}.users
                      inner join ${config.db.database}.papers_users_map
                      on users.users_id = papers_users_map.users_fk
                      inner join ${config.db.database}.papers
                      on papers.papers_id = papers_users_map.papers_fk
                      where papers_id = ?`;
          var inserts = ['fName','lName', obj.papers_id];
          sql = mysql.format(sql, inserts);
        }else{
          throw new Error('No paper id provided');
        }

        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}
            var data = rows[0];
            if (data == undefined) {throw new Error('No row data');} // Indicates there is at least one keyword
            callback('', rows);

            connection.release();
          }catch (err){
            console.log(err);
            connection.release();
            callback('', []);
          }
        });
      }catch(err){
          console.log(err);
      }
    });
  }
}

module.exports = new Paper();
