(function(){

	function init(){

	 	var submit = document.getElementById('db-add');
	 	var add_key = document.getElementsByClassName('add-key')[0];
	 	var add_author = document.getElementsByClassName("add-auth")[0];

	 	submit.addEventListener('click', create );
	 	add_key.addEventListener('click', addKey);
	 	add_author.addEventListener('click', addAuthor);

		getAuthors(function(authors){
			//console.log(authors);
			genAuthors( authors );
		});
	 	
	 	console.log("added Event add auth");
	}

	function getCurrentUser(callback){

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}


		$.ajax({
	      url: `/api/users`,
	      type: "GET",
	      headers: {
	        'x-access-token': m_token
	      },
	      success : function(data, textStatus, jqXHR){
		        if (status > 400){
		          //window.location.href = `/login`;
		        }else{
		          callback(data);
		        }
		        console.log(textStatus);
		        return true;
	      },
	      error : function(jqXHR, textStatus, errorThrown){
	        console.log(textStatus);
	        window.location.href = `/login`;
	      }
	    });
	}

	//Gives back all authors
	//callback(authors)
	function getAuthors(callback){

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

		$.ajax({
	 		url: `/api/users/all/`, // /delete //  /edit-abstract  /
	 		headers: {'x-access-token': m_token },
	 		type: "GET",
	 		success : function(data, textStatus, jqXHR){
	 			//console.log(data);

			if (status > 400){ //FAILED
			        console.log("Failed to create Paper");
			        console.log("Problem Getting Authors");
		    }else{
			    	console.log("Authors are here");
					
					getCurrentUser(
						function(currentUser){
							var current_user_index = -1;
							for(var i = 0; i < data.users.length; i++){
								if( data.users[i].users_id == currentUser.users_id)
									current_user_index = i;
							}
							data.users.splice(current_user_index, 1);

							callback(data);

						}
					);

		        	console.log(data);
		    }
	      console.log(textStatus);
	      return true;
	    },
	    error : function(jqXHR, textStatus, errorThrown){
	      console.log("not success " + textStatus);
	      console.log(data);
				console.log("Problem Getting Authors");
	 		}
		});
	}

	function genAuthors( authors ){
		//debugger;
		//var a = JSON.parse('{"users":[{"users_id":"1","fName":"Kris","lName":"Brown"},{"users_id":"2","fName":"Jon","lName":"Lee"},{"users_id":"3","fName":"Joe","lName":"Doe"},{"users_id":"4","fName":"Boss","lName":"Guy"}]}');
		var users = authors.users;
		var numUsers = users.length;
		console.log(numUsers);
		var authArr = [];
		//console.log(users);
		console.log(numUsers);
		for(var i = 0; i<numUsers; i++){
			authArr.push({
				name: users[i].fName + " " + users[i].lName,
				  id: users[i].users_id
				}
			);
		}

		//Split here into sep methods
		for(i= 0; i<numUsers; i++){
			$("#pAuthor").append("<option id='author-"+authArr[i].id+"'value='"+authArr[i].id+"'>"+authArr[i].name+"</option>");
			console.log("added author");

		}
		return authArr;
	}

	function addAuthor(evt){

		var val = $("#pAuthor").val();
		var remove_id = "remove-auth-" + val;
		$(".auth-cont").append('<p id="'+remove_id+'"class="r-box btn-success pure-button added-author"><span class="m-author" data-val="'+val+'">'+$("#pAuthor").find(":selected").text()+'</span></p>');
		$("#author-"+val).remove();
		$("#"+remove_id).click(removeAuthor);
		console.log(val);

	}

	function removeAuthor(evt){
		var remove = $(this).find(':first-child');
		var id     = remove.attr("id");
		var name   = remove.text();
		$("#pAuthor").append("<option id='author-"+id+"'value='"+id+"'>"+name+"</option>");
		this.remove();
	}//end of removeAuthor()

	function addKey(evt){
			
			console.log("hello");

		var num = document.getElementsByClassName("add-key").length;
		var val = $("#pKey").val();
		var remove_id = "remove-key-"+val;

		console.log(num);
		if( isValidKey() ){
			if( document.getElementsByClassName("m-key").length < 5){
				$("#key-cont").append('<p id="'+remove_id+'"class="r-box btn-success pure-button added-author"><span class="m-key" data-val="'+val+'">'+$("#pKey").val()+'</span></p>');
				$("#key-"+val).remove();
				$("#"+remove_id).click(removeKey);
			}
			else{
				swal("Sorry Buddy", "Does this paper really need that many keywords?");
			}
		}
		else{
			swal("Key not Added", "Keyword was a duplicate or was left blank");
		}
	}

	function isValidKey(){
		var keysOnPage = document.getElementsByClassName("m-key");
	
		var bool, inputKey, isDuplicate;
		if(keysOnPage.length > 0){
				console.log(keysOnPage.length);
			for(var i = 0; i<keysOnPage.length; i++){
				inputKey = document.getElementById("pKey").value;
				
				console.log(keysOnPage[i].textContent);
				if( inputKey == keysOnPage[i].textContent || inputKey == "" ){
					bool = false;
					isDuplicate = true;
					console.log("key was duplicate");
					console.log("keywords on page: " + i + " " + keysOnPage[i].textContent );
				}
				else{
					if(isDuplicate){
						bool = false;
					} 
					else{
						 bool = true;
					}
				}
			}
			//console.log(keysOnPage.length+ " was added");
		}
		else{
			inputKey = document.getElementById("pKey").value;
				if( inputKey == "" ){
					bool = false;
				}
				else{
					bool = true;
				}
			console.log("first word added");
		}
		console.log("isValid? " + bool);
		return bool;
	}

	function removeKey(evt){
		this.remove();	
	}//end of removeKey()

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
	 	var authors  = [];
	 	for(var k = 0; k<document.getElementsByClassName("m-key").length;k++){
	 		var val = document.getElementsByClassName("m-key")[k].textContent;
	 		console.log(val);
	 		keywords.push( val );
	 	}

	 	for(var a = 0; a<document.getElementsByClassName("m-author").length;a++){
	 		val = document.getElementsByClassName("m-author")[a].dataset.val;
	 		console.log("value of auhor is: " + val);
	 		authors.push( val );
	 	}
	 	console.log(authors);

		// var m_title     = "a title";//valueOf("m-title");
		// var m_abstract  = "asmnfjf";//valueOf("m-abstract");
		// var m_citations = "choite";//valueOf("m-citation");
		// var m_keywords  = ["1", "2"];
		// var m_authors   = ["2", "3"];
		

	 	// Send paper ID
	    /*for(var i = 0; i<10; i++){
	 		m_keywords[i] = get[i].value;
	 	}*/
	 	if( valueOf("m-title") == " " || valueOf("m-title") == null || valueOf("m-title") === ""){
	 		console.log(valueOf("m-title"));
	 		swal({
				title: "<h2 style='color:#DD6B55;'>Oppps! Title Missing</h2>",
				text: "Failed to add paper",
				imageUrl: "../img/bad.png",
				html: true
			});	
	 	}
	 	else{


	 		var data = {
	 			title:    valueOf("m-title"),
	 			abstract: valueOf("m-abstract"),
	 			citation: valueOf("m-citation"),
	 			keywords: keywords,
	 			authors:  authors,
	 			token:    m_token
	 		};

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
		 	});//end of AJAX call
		}
		
	 	//evt.preventDefault();
	 	return false;
	 }

	 init();
 })();
