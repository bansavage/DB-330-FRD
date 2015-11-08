var config = require('../../config');
var mysql = require('mysql');



//Good way to create the model
// Id is taken care of by the bookshelf library
var User = bookshelf.Model.extend({
  tableName: 'users',
  //permissions : ...
});

//The now old way to create a model

//NO LONGER WORKS
function Model() {


  return {

    // Allows the model to get a unique id when creating a new model
    // This needs to be updated when a new model is created or deleted
    id_tracker : {
      // Populate the array with all values of the table id's
      setup : function() {
        //var result_array;
        try{
          db.getConnection(function(err, connection){
            if (err) {throw err;}
            //Actual query
            var sql = `select p_id from frd.users`;
            connection.query(sql, function(err, result){
              if (err) {throw err;}
              this.value = result;
            });
          });
        }
        catch (err){
          console.log(`connection error: ${err.stack}`);
        }
        return;
      },

      value : [6,3],

      /*
        Saves the object into the database. This will either post or put
        the data this object is containing into the database.
      */
      save: function(){

      }


    }
  }
}

module.exports = Model;
