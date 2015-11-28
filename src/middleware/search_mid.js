var mysql = require('mysql');
var db = require('../database/db_pool');
var Search = function(){


  //Takes an array,
  //Callback(array of list objects)
  this.getPapers = function(arr, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
          var cases = [];
          var casesStr = "";
          for (var i in arr){
            var c = arr[i].replace("'"," ");
            cases.push(`searchable_keywords.searchable_keyword = '${c}'`);
          }

          if (cases === []){
            throw new Error('No keywords provided');
          }else{
            casesStr = cases.join(' or ');
          }

          var sql = `select ?? from papers
                      join paper_keywords
                      on papers.papers_id = paper_keywords.papers_fk
                      join searchable_keywords
                      on searchable_keywords.searchable_keywords_id = paper_keywords.searchable_keywords_fk
                      where ${casesStr} group by title`;
          var inserts = ['title'];
          sql = mysql.format(sql, inserts);

        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}
            if (rows[0] == undefined) {throw new Error('No row data');}
            //self.data = rows;
            callback(rows); // All values have been set
            connection.release();
          }catch (err){
            //Create new object attib if no data is found
            console.log(err);
            connection.release();
          }
        });
      }catch(err){
          console.log(`${err}`);
      }
    });
  }
}

module.exports = new Search;
