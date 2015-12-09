var mysql = require('mysql');
var config = require('../../config');
var user_model = require('../models/user_model');
var user_mid = require('./user_mid');
var uuid = require('node-uuid');
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
  },

  // Takes an object with the following
  this.createPaper = function(obj, callback){
    var data = {
      papers_id: uuid.v1(),
      title: "",
      abstract: "",
      citation : ""
    }

    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
        // Use the connection

        if (obj.title != undefined){
          data.title = obj.title;
        }

        if (obj.abstract !== undefined){
          data.abstract = obj.abstract;
        }

        if (obj.citation !== undefined){
          data.citation = obj.citation;
        }

        if (data.papers_id !== undefined){
          var sql = `insert into ${config.db.database}.papers set ?`;
        }else{
          throw new Error('No paper id provided');
        }

        connection.query(sql, data, function(err, result) {
          try{
            if (err) {throw err;}
            //if (data == undefined) {throw new Error('No row data');} // Indicates there is at least one keyword
            createPapersUsersMap(obj, data, callback, '');

            connection.release();
          }catch (err){
            console.log(err);
            connection.release();
            createPapersUsersMap(obj, data, callback, err);
          }
        });
      }catch(err){
          console.log(err);
      }
    });
  },

  //Checks to see the given user has premissions for a specific paper
  //Assumes this will be in a POST Request
  //Acts as middleware for the Papers delete and updates request
  //obj need the following information
  //{
  //   users_id -> retrieved from jwt token
  //   permission -> retreved from jwt token
  //   papers_id -> retureved from client json
  // }
  this.hasPermission = function(req, res, next){
      var users_id = req.body.userId;
      var permission = req.body.permission;
      var papers_id = req.body.papers_id;

      console.log(users_id);
      console.log(permission);
      console.log(papers_id);

      switch(permission) {
        case "admin":
          next();
          break;
        case "faculty":
          var complete = false;
          user_mid.getPapers({users_id: users_id}, function(err, papers){
            if (err) {
              console.log(err);
              res.status(404).send({message: 'Paper lookup error'});
            }else{
              papers.forEach(function(paper, index, arr){
                console.log("a" + paper.papers_id);
                console.log("b" + papers_id);
                if (paper.papers_id == papers_id){
                  console.log("adfad");
                  next(); // User has access to the paper
                  complete = true;
                }
                if (index >= arr.length-1 && complete == false){
                  res.status(404).send({message: 'Unauthorized Paper Access'}); // User does not have access to that paper
                }
              });
            }
          });
          break;
        case "student":
          res.status(401).send({message: 'Not authorized'});
          break;
        case "public":
          res.status(401).send({message: 'Not authorized'});
          break;
      }

      if (permission !== 'admin' && permission !== 'faculty' && permission !== 'student' && permission !== 'public'){
        res.status(401).send({message: 'No premissions'});
      }


  }
}

//Creates the papers users map
var createPapersUsersMap = function(obj, data, callback, err){
  try{
    if (err){throw err;}
  }catch(err){
    console.log(err);
    callback(err, '');
  }
  db.getConnection(function(err, connection) {
    try{
      if (err) {throw err;}
      // Use the connection
      if (data.papers_id !== undefined && obj.users_id !== undefined){
        var sql = `insert into ${config.db.database}.papers_users_map set ?`;
        var post = {
          papers_fk : data.papers_id,
          users_fk : obj.users_id
        }
      }else{
        throw new Error('No paper or user id provided');
      }

      connection.query(sql, post, function(err, result2) {
        try{
          if (err) {throw err;}
          //if (data == undefined) {throw new Error('No row data');} // Indicates there is at least one keyword
          callback('', result2);

          connection.release();
        }catch (err){
          console.log(err);
          connection.release();
          callback('', result2);
        }
      });
    }catch(err){
        console.log(err);
    }
  });
};

module.exports = new Paper();
