

(function(){

	function init(){

	 	var selectButton = document.getElementById('db-select');


    getPapers(function(papers){
      genPapers( papers );
    });

    selectButton.addEventListener('click', function(evt){
      var papersE = document.getElementById('pPapers');
      var currentPaper = papersE.selectedOptions[0];

      //CurrentAuthor is an object with the current author info
      populateFields(currentPaper);
    });

	 	console.log("added Event add auth");
	}

  //Return the elements from the form
  function getFormElements(){
    return {
      papersE : document.getElementById('pPapers'),
      titleE : document.getElementById('m-title'),
      abstractE : document.getElementById('m-abstract'),
      citationE : document.getElementById('m-citation'),
      authorsE : document.getElementById('pAuthor')
    };
  }

	function getCurrentUser(callback){

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}


		$.ajax({
	      url: `/api/papers`,
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
  function getLocalPaper(papers_id){
    var papersString = localStorage.getItem('papers');
    var papers = JSON.parse(papersString);
    for (var i=0; i<papers.length; i++){
      if (papers[i].papers_id == papers_id){
        return papers[i];
      }
    }
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
	 		}
		});
	}

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
  function populateFields(currentPaper){
      var formE = getFormElements();
      // papersE : document.getElementById('pPapers'),
      // titleE : document.getElementById('m-title'),
      // abstractE : document.getElementById('m-abstract'),
      // citationE : document.getElementById('m-citation'),
      // authorsE : document.getElementById('pAuthor')
      var currentPaper = getLocalPaper(currentPaper.getAttribute('data-paper-id'));

      formE.titleE.value = currentPaper.title;
      formE.abstractE.value = currentPaper.abstract;
      formE.citationE.value = currentPaper.citation;
  }

	/*
	 *Gets value of element with specified id
	 */
	function valueOf(id){
		return document.getElementById(id).value;
	}

	/*Creates a paper*/
	 function deletePaper(evt){

		var current_paper= document.getElementById("pPapers");

		var current_paper_id = current_paper.selectedOptions[0].getAttribute('data-paper-id');

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

		var data = {
	 			papers_id:  current_paper_id,
	 			token:    m_token
	 		};

	 	$.ajax({
	 		url: "/api/papers/delete", // /delete //  /edit-abstract  /
	 		type: "POST",
	 		data: JSON.stringify(data), //
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
	 	//evt.preventDefault();
	 	return false;
	 }

	 init();
 })();


// for(var i = 0; i<document.getElementsByClassName("fa-times").length; i++){
// 	document.getElementsByClassName("fa-times")[i].addEventListener("click", function(e){
//
// 		swal({
// 		  title: "Are you sure?",
// 		  text: "This Paper will be permanently deleted",
// 		  type: "warning",
// 		  showCancelButton: true,
// 		  confirmButtonColor: "#DD6B55",
// 		  confirmButtonText: "Yes, delete it!",
// 		  cancelButtonText: "No, cancel plx!",
// 		  closeOnConfirm: false,
// 		  closeOnCancel: false
// 		},
// 			function(isConfirm){
// 			  if (isConfirm) {
// 			    swal("Deleted!", "Paper has been deleted", "success");
// 			  } else {
// 				    swal("Cancelled", "Paper is safe and sound and not deleted :)", "error");
// 			  }
// 			});
// 		});
// }
