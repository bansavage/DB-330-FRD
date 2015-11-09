//variables are not global, on availible in the scope of this module
var paper_id, paper_title, paper_abstract, paper_citation;

/*                    *\
**  Setter Functions  **
\*                    */

//Exports allows other modules to use these functions
exports.setPaperId = function ( id_number ){
	paper_id = id_number;
};

exports.setPaperTitle = function ( title ){
	paper_title = title;
};

exports.setPaperAbstract = function ( abstract ){
	paper_abstract = abstract;
};

exports.setPaperCitation = function ( citation ){
	paper_citation = citation;
};

/*                    *\
**  Getter Functions  **
\*                    */
exports.getPaperInfo = function(){

	//returns literal object with the values of this module
	return{
		paper_id: paper_id,
		paper_title: paper_title,
		paper_abstract: paper_abstract,
		paper_citation: paper_citation
	};

};