/*Needs to be this way so he can have multiple instances
  of a paper object
*/
module.exports = function( paper_info ){

	var values = {
		paper_id: null,
		paper_title: null,
		paper_abstract: null,
		paper_citation: null
	};

	//Sets propety for paper if exists
	for( var property in values ){
		if( values[property] !== 'undefined' ){
			values[property] = paper_info[property];
		}
	}

	var paper_functions = {
		
		//returns array of 
		getPaperInfo: function(){
			return values;
		},

		/*                    *\
		**  Setter Functions  **
		\*                    */

		setPaperId: function ( id_number ){
			values['paper_id'] = id_number;
		},

		setPaperTitle: function ( title ){
			values['paper_title'] = title;
		},

		setPaperAbstract: function ( abstract ){
			values['paper_abstract'] = abstract;
		},

		setPaperCitation: function ( citation ){
			values['paper_citation'] = id_number;
		}


	};

	//returns above functions
	//an array of functions for this module
	return paper_functions;

};


