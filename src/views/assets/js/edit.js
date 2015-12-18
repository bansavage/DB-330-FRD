

(function(){

	function init(){

	 	var selectButton = document.getElementById('db-select');
		var addAuthorButton  = $(".add-auth");
		var addKeywordButton = $(".add-key");
		addAuthorButton.click(addAuthorByButton);
		addKeywordButton.click(addKeywordByButton);

    	getPapers(function(papers){
    	genPapers( papers );

    });

		selectButton.addEventListener('click', function(evt){
			cleanUp();
			var papersE = document.getElementById('pPapers');
			var currentPaper = papersE.selectedOptions[0];

			//CurrentPaper is an object with the current paper info
			populateFields(currentPaper);
		});

	 	console.log("added Event add auth");
	}

	/*
	 *Gets value of element with specified id
	 */
	function valueOf(id){
		return document.getElementById(id).value;
	}

	/*
	* validate string
	*/
	function validate(x){
		if (x == null || x == "") {
        	return false;
    	}
    	else{
    		return true;
    	}
	}

  //Return the elements from the form
  	function getFormElements(){
	    return {
	      papersE   : document.getElementById('pPapers'),
	      titleE    : document.getElementById('m-title'),
	      abstractE : document.getElementById('m-abstract'),
	      citationE : document.getElementById('m-citation'),
	      authorsE  : document.getElementById('pAuthor')
	    };
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

	  //Gets the given paper's information from localStorage
     //Actually gets from the server
	function getLocalPaper(papers_id){
	    var papersString = localStorage.getItem('papers');
	    var papers = JSON.parse(papersString);
	    for (var i=0; i<papers.length; i++){
	      if (papers[i].papers_id == papers_id){
	        return papers[i];
	      }
	    }
	}

	//Gets a paper with papers_id provided
	function getPaper(papers_id, callback){
		getPapers(function(papers){
			for(var i=0; i<papers.length; i++){
				if (papers[i].papers_id == papers_id){
					callback(papers[i]);
					return;
				}
			}
		});
	}

	//clean page of buttons and options
  	function cleanUp(){
    	var allAuthorButtons = $('.r-box');
		var allAuthorOpt = $('.authorOpt'); // Gets all author option tags
	
		allAuthorOpt.remove();
   		allAuthorButtons.remove();
  	}

	//Gives back all authors
	//callback(authors)
	function getPapers(callback){

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

		$.ajax({
	 		url: `/api/papers`, // /delete //  /edit-abstract  /
	 		headers: {'x-access-token': m_token },
	 		type: "GET",
	 		success : function(data, textStatus, jqXHR){
	 			//console.log(data);

			if (status > 400 || !data.papers){ //FAILED
			        console.log("Problem Getting Papers");
		    }else{
			    	console.log("Authors are here");
					console.log(data);
              var stringifiedPapers = JSON.stringify(data.papers);
              localStorage.setItem('papers', stringifiedPapers);
							callback(data.papers);
		    }
	      console.log(textStatus);
	      return true;
	    },
	    error : function(jqXHR, textStatus, errorThrown){
	      	console.log("not success " + textStatus);
	      	console.log(data);
			console.log("Problem Getting Authors");
	 	}//end of error
		});
	}

  //id -> the id of the author
  function addAuthorByButton(){

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

		var authorE = $("#pAuthor");
		var papersE = document.getElementById('pPapers');
		var currentPaper = papersE.selectedOptions[0];
		var currentPaperId = currentPaper.getAttribute('data-paper-id');

		if (authorE.find(":selected").length > 0){
			console.log("hit");
			var authors_id = authorE.val();
			var remove_id = "remove-auth-" + authors_id;
			var data = {
					papers_id : currentPaperId, // <-keep dat
					authors : [ //keywords : [ keyword ]
						authors_id
					],
					data: m_token 
			}

			var dataJSON = JSON.stringify(data);

			//Add to server
			$.ajax({
		      url: `/api/papers/authors/add`,
		      type: "POST",
					data : dataJSON,
					contentType: "application/json",
		      success : function(data, textStatus, jqXHR){
			        if (status > 400){
			          //window.location.href = `/login`;
						console.log('Addition was Unsuccessful');
			        }else{
						$(".auth-cont").append(`<p id='${remove_id}' class='r-box btn-success pure-button added-author'>
						                        	<span class='m-author' data-val='${authors_id}'>
						                             	${authorE.find(":selected").text()}
						                            </span>
						                       	</p>`);
								var author = {
									users_id : authors_id,
									fName: authorE.find(":selected").text(),
									lName: ""
								}

						$(`#author-${authors_id}`).remove();
						$("#"+remove_id).click(removeAuthor.bind(this, author, currentPaperId));
			        }
			        console.log(textStatus);
			        return true;
		      },
		      error : function(jqXHR, textStatus, errorThrown){
		        console.log(textStatus);
						console.log('Addition was Unsuccessful');
		      }
		    });
			//Add to server
		}else{
			//Print out to screen
			console.log('No Author Selected');
		}
	}

  //author-> the author object -> completed
  function addAuthorById(author, papers_id){
    var authors_id = author.users_id;
    console.log(author);
		var remove_id = "remove-auth-" + authors_id;
		$(".auth-cont").append(`<p id='${remove_id}' class='r-box btn-success pure-button added-author'>
                              <span class='m-author' data-val='${authors_id}'>
                              ${author.fName} ${author.lName}
                              </span>
                            </p>`);
		$("#author-"+authors_id).remove();
		$("#"+remove_id).click(removeAuthor.bind(this, author, papers_id));
	}

	//Adds authors to the dropdown, takes in author objects
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
			$("#pAuthor").append("<option class='authorOpt' id='author-"+authArr[i].id+"'value='"+authArr[i].id+"'>"+authArr[i].name+"</option>");
			console.log("added author");
		}

		return authArr;
	}


	function getAuthors(callback){

		var m_token ="";

	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

		$.ajax({
	 		url: `/api/users/all/`, 
	 		headers: {'x-access-token': m_token },
	 		type: "GET",
	 		success : function(data, textStatus, jqXHR){
				if (status > 400){ //FAILED
				        console.log("Failed to create Paper");
				        console.log("Problem Getting Authors");
			    }
			    else{
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
			    }//end of else
	      			console.log(textStatus);
	      			return true;
	    	},//end of succes
	    error : function(jqXHR, textStatus, errorThrown){
	      console.log("not success " + textStatus);
	      console.log(data);
				console.log("Problem Getting Authors");
	 		}
		});//end of AJAX
	}//end of getAuthors function

     //this -> is the button that calls this event
	//author object -> users_id, fName, lName
  function removeAuthor(author, papers_id){
		var authors_id = author.users_id;
		var self = $(`#remove-auth-${authors_id}`);
		// var remove = self.find(':first-child');
		// var id     = remove.attr("data-val"); // Authors id
		// var name   = remove.text();

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

		$.ajax({
	      url: `/api/papers/authors/delete`,
	      type: "POST",

				data : {
						papers_id : papers_id,
						authors_id : authors_id,
						data: m_token
				},
	      success : function(data, textStatus, jqXHR){
		        if (status > 400){
		          //window.location.href = `/login`;
							console.log('Remove was Unsuccessful');
		        }else{

							$("#pAuthor").append("<option class='authorOpt' id='author-"+authors_id+"'value='"+authors_id+"'>"+author.fName +
							 										" " + author.lName + "</option>");
							self.remove();
		        }
		        console.log(textStatus);
		        return true;
	      },
	      error : function(jqXHR, textStatus, errorThrown){
	        console.log(textStatus);
					console.log('Remove was Unsuccessful');
	      }
	    });
	}//end of removeAuthor()

	function genPapers( papers ){
		var numPapers = papers.length;

		//Split here into sep methods
		for(i= 0; i<numPapers; i++){
			$("#pPapers").append(`<option id='paper-${papers[i].papers_id}' data-paper-id=${papers[i].papers_id}>${papers[i].title}</option>`);
			console.log("added papers");
		}
		return papers;
	}

  //Gets currently selected paper's info and populates the fields
  function populateFields(currentPaperE){
      var formE = getFormElements();
      
		console.log(currentPaperE);

			var currentPaperId = currentPaperE.getAttribute('data-paper-id');
			getPaper(currentPaperId, function(currentPaper){

				formE.titleE.value    =  currentPaper.title;
	    		formE.abstractE.value =  currentPaper.abstract;
	    		formE.citationE.value =  currentPaper.citation;

				getAuthors(function(authors){

					//Makes it so the current user can't remove themself as an author of a paper
					getCurrentUser(function(currentUser){
						var current_user_index = -1;
							for(var i = 0; i < currentPaper.authors.length; i++){
								if( currentPaper.authors[i].users_id != currentUser.users_id){

									addAuthorById(currentPaper.authors[i], currentPaper.papers_id);

									//Loop over authors, if exists in authors, delete it from array
									//Only adds authors that are not already in the paper to the dropdown list
									var current_author_index = -1;
									for(var j = 0; j < authors.users.length; j++){
										if( currentPaper.authors[i].users_id == authors.users[j].users_id){
											current_author_index = j;
										}
									}
									if (current_author_index != -1){
										authors.users.splice(current_author_index, 1);
									}

								}//end of if
							}//end of for
							//Creates dropdown of authors
							genAuthors(authors);
					});//end of CurrentUserMethod
				
				});//end of getAuthorsMethod


				//Keywords ----
				console.log("doing keywords now");
				console.log(currentPaper.keywords);

				genKeywords( currentPaper.keywords, currentPaperId );

			});//end of getPaper
  }

	/**
	**Compares values on the page to the values in localstorage
	**if they are the same return false
	**if there are different values return
	**a data object with the different values
	**/
	function getData( cp, lp ){

		var data = {};
		var cp_title, cp_abstract, cp_citation;
		var lp_title, lp_abstract, lp_citation;

	 	cp_title      =  cp.titleE.value;
	 	cp_abstract   =  cp.abstractE.value;
	 	cp_citations  =  cp.citationE.value;

	 	lp_title      =  lp.title;
	 	lp_abstract   =  lp.abstract;
	 	lp_citations  =  lp.citation;


	 	//Compare values
	 	//Compare Title
	 	if( validate(cp_title)    ||  cp_title     !==  lp_title     ){
	 		data.title = cp_title;
	 	}

	 	//Compare abstract
	 	if( validate(cp_abstract) ||  cp_abstract  !==  lp_abstract  ){
	 		data.abstract = cp_abstract;
	 	}

	 	//Compare citations
	 	if( validate(cp_citations)||  cp_citations !==  lp_citations ){
	 		data.citations = cp_citations;
	 	}

	 	return data;
	}

	 // Only saves changes of title, citation, and abstract
	 function saveChanges(evt){

		var current_paper     =  document.getElementById("pPapers");
		var current_paper_id  =  current_paper.selectedOptions[0].getAttribute('data-paper-id');
		var local_paper_data  =  getLocalPaper( current_paper_id );
		var curr_paper_data   =  getFormElements();

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

	 	var valid_data = getData();
	 	if( valid_data != null ){
			var data = {
		 			papers_id:  current_paper_id,
		 			token:    m_token,
		 			title: valid_data.title,
		 			title: valid_data.citations,
		 			title: valid_data.abstract,
		 	};
		 	$.ajax({
		 		url: "/api/papers/edit",
		 		type: "POST",
		 		data: JSON.stringify(data), 
		 		contentType: "application/json",
		 		success : function(data, textStatus, jqXHR){
		 				if (status >= 400){ //FAILED
				        console.log("Failed to delete Paper");
				        swal({
						  title: "<h2 style='color:#DD6B55;'>Oppps!</h2>",
						  text: "Failed to add paper",
						  imageUrl: "../img/bad.png",
						  html: true
						});
		      }else{
				    console.log("etaete");
						console.log(data);

		 				swal("Paper Deleted!", "Paper has been deleted successfully", "success")
						$(`#paper-${current_paper_id}`).remove();
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
				  text: "Failed to delete paper",
				  imageUrl: "../assets/img/bad.png",
				  html: true });
		      }
		 	});
		}
	 	//evt.preventDefault();
	 	return false;
	 }

	 //Keywords stuff

	 //Adds keywords of the selected paper to the page
	function genKeywords( selected_keywords, currentPaperId ){
		
		var keywords = selected_keywords;
		var numKeywords = keywords.length;
		var kw; // single keyword
		console.log(numKeywords);

		for(i= 0; i<numKeywords; i++){
			//append the keyword button to the page
			kw = keywords[i];
			$("#key-cont").append(
				`<p id='${kw}' class='r-box btn-success pure-button added-author'>
					<span class='m-author' data-val='${kw}'>
						${ kw }
					</span>
				</p>`
			);

			$("#"+kw).click(removeKey.bind(this, kw, currentPaperId ));
			//$("#"+kw).remove();
			console.log(kw);
		}

	}//end of genKeyword function

	function removeKey( keyword, papers_id ){

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

	 	var kwEle = document.getElementById( keyword );
	 	console.log("key is: " + keyword );
	 	console.log(kwEle);

	 	var data = {
			papers_id : papers_id,
			keywords  : [ keyword ],
			data: m_token
		}

		var dataJSON = JSON.stringify(data);

		$.ajax({
	      		url: `/api/papers/keywords/delete`,
	      		type: "POST",
	      		contentType: "application/json",
				data : dataJSON,
	      		success : function(data, textStatus, jqXHR){
		        	if (status > 400){
		          	//window.location.href = `/login`;
						console.log('Remove was Unsuccessful');
		        	}else{
						kwEle.remove();
		        	}
		        	console.log(textStatus);
		        	console.log(keyword
		        	 + "has been removed successfully");
		        	return true;
	     		},//end of success
	      		error : function(jqXHR, textStatus, errorThrown){
	        		console.log(textStatus);
					console.log('Remove was Unsuccessful');
	      		}//end of error
	    });
		
	}//end of removeKey()

	//adds keyword to selected paper when plus button clicked
	function addKeywordByButton(){

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

		var keywordE = document.getElementsByClassName("pKey")[0];
		var keyword = keywordE.value;
		var papersE  = document.getElementById('pPapers');
		var currentPaper = papersE.selectedOptions[0];
		var currentPaperId = currentPaper.getAttribute('data-paper-id');

		if (keyword != "" || keyword != null){
			console.log("hit");			
			var data = {
					papers_id : currentPaperId, 
					keywords : [ 
						keyword
					],
					data: m_token 
			}

			var dataJSON = JSON.stringify(data);

			//Add to server
			$.ajax({
		      url: `/api/papers/keywords/add`,
		      type: "POST",
					data : dataJSON,
					contentType: "application/json",
		      		success : function(data, textStatus, jqXHR){

			        	if (status > 400){
							console.log('Addition was Unsuccessful');
			        	}else{
			        		//appends new keyword to page
							$("#key-cont").append(
								`<p id='${keyword}' class='r-box btn-success pure-button added-author'>
									<span class='m-author' data-val='${keyword}'>
										${ keyword }
									</span>
								</p>`
							);
							//adds click evt to remove keyword
							$("#"+keyword).click( removeKey.bind( this, keyword, currentPaperId ) );
			        	}
			        	console.log(textStatus);
			        	return true;

		      		},//end of success
		      		error : function(jqXHR, textStatus, errorThrown){
		        		console.log(textStatus);
						console.log('Addition was Unsuccessful');
		      		}//end of error
		    });//end of AJAX
			//Add to server
		}else{
			//Print out to screen
			console.log('No Author Selected');
		}
	}//end of addKeywordByButton function

	 init();
 })();
