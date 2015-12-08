var mysql = require('mysql');
var config = require('../../config');
var db = require('../database/db_pool');
var Search = function(){


  //Takes an array of keywords,
  //Callback(array of list objects)
  this.getPapers = function(obj, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
          var cases = [];
          var casesStr = "";
          if (obj.keywords.constructor === Array){
            for (var i in obj.keywords){
              var c = obj.keywords[i].replace("'"," ");
              cases.push(`searchable_keywords.searchable_keywords = '${c}'`);
              cases.push(`paper_keywords.keyword = '${c}'`);
            }
          }else{
            var c = obj.keywords.replace("'"," ");
            cases.push(`searchable_keywords.searchable_keywords = '${c}'`);
            cases.push(`paper_keywords.keyword = '${c}'`);
          }

          if (cases === []){
            throw new Error('No keywords provided');
          }else{
            casesStr = cases.join(' or ');
          }
          console.log(`test ${casesStr}`);

          var sql = `select ??, ??, ??, ?? from ${config.db.database}.papers
                      join ${config.db.database}.paper_keywords
                      on papers.papers_id = paper_keywords.papers_fk
                      join ${config.db.database}.searchable_keywords
                      on searchable_keywords.searchable_keywords_id = paper_keywords.searchable_keywords_fk
                      where ${casesStr} group by title`;
          var inserts = ['papers_id', 'title', 'abstract', 'citation'];
          sql = mysql.format(sql, inserts);

        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}
            if (rows[0] == undefined) {throw new Error('No row data');}

            callback('', rows);
            connection.release();
          }catch (err){
            callback(err, []);
            console.log(err);
            connection.release();
          }
        });
      }catch(err){
          callback(err, []);
          console.log(err);
      }
    });
  }
}

module.exports = new Search;
