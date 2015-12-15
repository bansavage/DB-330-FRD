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
		return document.getElementById(id).value;
	}

	 function create(evt){
		
		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}

		// var m_title     = "a title";//valueOf("m-title");
		// var m_abstract  = "asmnfjf";//valueOf("m-abstract");
		// var m_citations = "choite";//valueOf("m-citation");
		// var m_keywords  = ["1", "2"];
		// var m_authors   = ["2", "3"];
		var data = {
	 			title:    "m_title",
	 			abstract: "m_abstract",
	 			citation: "m_citations",
	 			keywords: [],
	 			authors:  [],
	 			token:    m_token
	 		};
	    /*for(var i = 0; i<10; i++){
	 		m_keywords[i] = get[i].value;
	 	}*/

	 	$.ajax({
	 		url: "/api/papers/create",
	 		type: "POST",
	 		data: data,
	 		success : function(data, textStatus, jqXHR){
	 			console.log(data);
	 			swal("Paper Created!", "Paper has been created successfully", "success")

				if (status > 400){
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