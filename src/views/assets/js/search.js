/**
 *When Search page is loaded
**/
$(document).ready(function(){

   // jQuery methods go here...

   $("body").append( generateResult() );
   console.log("ready");
});

function generateResult(){
	var container = $createDiv();
	container.append( newParagraph("Hello its working") );
	return container;
}

function appendContent( myHtml ){
	if( $(".posts").append(html) ){
		return true;
	}
	else{
		return false;
	}
}

function createDiv(){
	return document.createElementByClassName("div");
}

function newParagraph( myText ){
	var text = document.createTextNode( myText );
	var paragraph = document.createElementByClassName("p");
	paragraph.append(text);
	return paragraph;

}
