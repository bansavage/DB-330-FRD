//paper is the paper_model module
var paper = require('./paper_model.js');

//values for a new paper
var testPaperValues = {

	paper_id: 111,
	paper_title: "Test Paper",
	paper_abstract: "Poop",
	paper_citation: "Toilet"

};

//create new paper object
var testPaper = paper(testPaperValues);
//log paper info
console.log( testPaper.getPaperInfo() );
console.log("-----------------------");
//log paper id
console.log("Paper Id was: " + testPaper.getPaperInfo()['paper_id']);
//set paper id
testPaper.setPaperId(88);
//log paper id
console.log("Paper Id is now: " + testPaper.getPaperInfo()['paper_id']);
console.log("-----------------------");
//log paper info again
console.log( testPaper.getPaperInfo() );

var moreValues = {

	paper_id: 13,
	paper_title: "Psychology of Fear & Superstition",
	paper_abstract: "Why do we fear?",
	paper_citation: "Clemens"

};


testPaper = paper(moreValues);

var anotherPaper = paper(testPaperValues);
console.log("-----------------------");
console.log( testPaper.getPaperInfo() );
console.log("-----------------------");
console.log( anotherPaper.getPaperInfo() );