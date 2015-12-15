(function(){


	function init(){
	 	var submit = document.getElementById('db-add');
	 	submit.addEventListener('click', create );
	 	$("#add-auth").click(
	 		function(){
	 			var addBtn = $("#add-auth").clone();
				//$("#add-auth").remove();
				$(".pAuth:last-child").clone().appendTo("auth-div");
				$(".pAuth:last-child").value="";
				$(".pAuth:last-child").placeholder="Author";
				console.log("auth clicked");
	 		}
	 	);
	 	console.log("added Event add auth");
	}

	function newAuthInput(){

	}

	function valueOf(id){
		return $(id).value;
	}

	 function create(evt){
		
		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

		var m_title     = valueOf("m-title");
		var m_abstract  = valueOf("m-abstract");
		var m_citations = valueOf("m-citation");
		var m_keywords = {};
		var m_authors = {};
	 /*	for(var i = 0; i<10; i++){
	 		m_keywords[i] = get[i].value;
	 	}*/

	 	$.ajax({
	 		url: "/api/papers/create",
	 		type: "POST",
	 		data : {
	 			title:    m_title,
	 			abstract: m_abstract,
	 			citation: m_citations,
	 			keywords: m_keywords,
	 			authors:  m_authors,
	 			token:    m_token
	 		},
	 		success : function(data, textStatus, jqXHR){
	 			
	 			swal("Paper Created!", "Paper has been created successfully", "success")

				if (status > 400){
			        console.log("wrong username or password");
			        swal({
					  title: "<h2 style='color:#DD6B55;'>Oppps!</h2>",
					  text: "Failed to add paper",
					  imageUrl: "../img/bad.png",
					  html: true
					});
	      }else{
		   console.log("etaete");
	        
	      }
	      console.log(textStatus);
	      return true;
	    },
	    error : function(jqXHR, textStatus, errorThrown){
	      console.log(textStatus);
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