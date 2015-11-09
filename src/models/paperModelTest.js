var paper = require('./paper_model.js');

paper.setPaperId( 111 );
paper.setPaperTitle( 'Test Paper' );
paper.setPaperAbstract( 'Poop' );
paper.setPaperCitation( 'Toilet' );

console.log(paper.getPaperInfo());