(function(){

	//WEIRD STUFF GOIN ONS
	function getAuthors(){
		
		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}
		$.ajax({
	 		url: `/api/users/all?token=${m_token}`,
	 		type: "GET",
	 		async:
	 		success : function(data, textStatus, jqXHR){

	 			return JSON.stringify(data);

	 			
	 			if (status > 400){
			        console.log("Failed");
			   		window.location.href = `/controlpanel/?token=${m_token}`;
				}
			}
	    });
	}



	function init(){

	 	var submit = document.getElementById('db-add');
	 	var add_key = document.getElementsByClassName('add-key')[0];
	 	submit.addEventListener('click', create );
	 	add_key.addEventListener('click', addKey);

	 	console.log("added Event add auth");
	}

	function genAuthors(){

		var a = JSON.parse('{"users":[{"users_id":"1","fName":"Kris","lName":"Brown"},{"users_id":"2","fName":"Jon","lName":"Lee"},{"users_id":"3","fName":"Joe","lName":"Doe"},{"users_id":"4","fName":"Boss","lName":"Guy"}]}');
		var users = a.users;
		var numUsers = Object.keys(a.users).length;
		var authArr = [];
		console.log(users);
		console.log(numUsers);
		for(var i = 0; i<numUsers; i++){
			authArr.push({
				name: users[i].fName + " " + users[i].lName,
				  id: users[i].users_id
			}
		);
		//Split here into sep methods
		
}
return authArr;
	}

	function addKey(evt){
		
		genAuthors();

		
		var num = document.getElementsByClassName("add-key").length;
		console.log(num);
		if( document.getElementsByClassName("pKey").length < 5){
		$(".key-div").append("<div class='w100 flex key-cont'><input type='text' class='pure-input-1-2 pKey' name='paperKeywords' placeholder='Keyword'><i class='add-key fa fa-plus-circle pure-btn'></i></div><br/>");
		document.getElementsByClassName('add-key')[num-1].remove();
		document.getElementsByClassName('add-key')[num-1].addEventListener('click', addKey);
		}
		else{
			swal("Sorry Buddy", "Does this paper really need that many keywords?");
		}
	}

	/*
	 *Gets value of element with specified id
	 */
	function valueOf(id){
		return document.getElementById(id).value;
	}

	/*Creates a paper*/
	 function create(evt){
		
		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}
	 	var keywords = [];
	 	for(var k = 0; k<document.getElementsByClassName("pKey").length;k++){
	 		var val = document.getElementsByClassName("pKey")[k].value;
	 		console.log(val);
	 		keywords.push( val );
	 	}
	 	console.log(keywords);

		// var m_title     = "a title";//valueOf("m-title");
		// var m_abstract  = "asmnfjf";//valueOf("m-abstract");
		// var m_citations = "choite";//valueOf("m-citation");
		// var m_keywords  = ["1", "2"];
		// var m_authors   = ["2", "3"];
		var data = {
	 			title:    valueOf("m-title"),
	 			abstract: valueOf("m-abstract"),
	 			citation: valueOf("m-citation"),
	 			keywords: keywords,
	 			authors:  ["2", "3"],
	 			token:    m_token
	 		};

	 	// Send paper ID
	    /*for(var i = 0; i<10; i++){
	 		m_keywords[i] = get[i].value;
	 	}*/

	 	$.ajax({
	 		url: "/api/papers/create", // /delete //  /edit-abstract  /
	 		type: "POST",
	 		data: JSON.stringify(data), //
	 		contentType: "application/json",
	 		success : function(data, textStatus, jqXHR){
	 			console.log(data);
	 			swal("Paper Created!", "Paper has been created successfully", "success")

				if (status > 400){ //FAILED
			        console.log("Failed to create Paper");
			        swal({
					  title: "<h2 style='color:#DD6B55;'>Oppps!</h2>",
					  text: "Failed to add paper",
					  imageUrl: "../img/bad.png",
					  html: true
					});
	      }else{
		    console.log("etaete");
	        console.log(data);
	      }
	      console.log(textStatus);
	      return true;
	    },
	    error : function(jqXHR, textStatus, errorThrown){
	      console.log("not success " + textStatus);
	      console.log(data);
	      swal({
			  title: "<h2 style='color:#DD6B55;'>Oppps!</h2>",
			  text: "Failed to add paper",
			  imageUrl: "../assets/img/bad.png",
			  html: true });
	      }
	 	});
	 	//evt.preventDefault();
	 	return false;
	 }

	 init();
 })();