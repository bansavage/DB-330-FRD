/**
 *When Search page is loaded
**/

function init(){
 var go = document.getElementsByClassName('go')[0];
 go.addEventListener('click', submitForm );

}

function submitForm(evt){

 var go = document.getElementById('input-1');

 var keywords = go.value.split(' ');
 console.log(keywords);

 var urlString = keywords.join('&keywords=');
 console.log(urlString);



 $.ajax({
   url: `/search/search?keywords=${urlString}`,
   type: "GET",
   success : function(data, textStatus, jqXHR){
     if (status > 400){
       window.location.href = `/search`;
     }else{
       window.location.href = `/search/search?keywords=${urlString}`;
     }
     console.log(textStatus);
     return true;
   },
   error : function(jqXHR, textStatus, errorThrown){
     window.location.href = `/search`;
     console.log(textStatus);
   }
 });
 //evt.preventDefault();
 return false;
}





// $(document).ready(function(){
//
//    // jQuery methods go here...
//
//    $("body").append( generateResult() );
//    console.log("ready");
// });
//
// function generateResult(){
// 	var container = createDiv();
// 	container.append( newParagraph("Hello its working") );
// 	return container;
// }
//
// function appendContent( myHtml ){
// 	if( $(".posts").append(html) ){
// 		return true;
// 	}
// 	else{
// 		return false;
// 	}
// }
//
// function createDiv(){
// 	//return document.createElementByClassName("div");
// }
//
// function newParagraph( myText ){
// 	var text = document.createTextNode( myText );
// 	var paragraph = document.createElementByClassName("p");
// 	paragraph.append(text);
// 	return paragraph;
//
// }

init();
