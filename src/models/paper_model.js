/*Needs to be this way so he can have multiple instances
  of a paper object
*/
var Paper = function(){

	this.data = {
		paper_id: null,
		paper_title: null,
		paper_abstract: null,
		paper_citation: null
	};

	//sets properties of a paper if exists
	this.fill = function( paper_info ){

		for( var property in this.data ){
			if( this.data[property] !== 'undefined' ){
				this.data[property] = paper_info[property];
			}
		}
		
	};

	//returns array of a papers properties
	this.getPaperInfo = function(){
		return this.data;
	},

	/*                    *\
	**  Setter Functions  **
	\*                    */

	this.setPaperId = function ( id_number ){
		this.data['paper_id'] = id_number;
	},

	this.setPaperTitle =function ( title ){
		this.data['paper_title'] = title;
	},

	this.setPaperAbstract = function ( abstract ){
		this.data['paper_abstract'] = abstract;
	},

	this.setPaperCitation = function ( citation ){
		this.data['paper_citation'] = id_number;
	}

};

/*
**Returns an actual new instance of a paper
**/
module.exports = function( paper_info ){
	var instance = new Paper();
	instance.fill(paper_info);
	return instance;
};


