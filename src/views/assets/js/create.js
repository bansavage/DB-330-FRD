(function(){


	function init(){
	 	var submit = document.getElementById('db-submitdd');
	 	submit.addEventListener('click', create );
	}

	function $( id ){
		return document.getElementById(id);
	}

	function valueOf(id){
		return $(id).value;
	}

	 function create(evt){
		
		var m-token;
	 	if( localeStorage.getItem("token") ){
	 		m-token = localeStorage.getItem("token");
	 	}

		var m-title     = valueOf("m-title");
		var m-abstract  = valueOf("m-abstract");
		var m-citations = valueOf("m-citation");
		var m-keywords, m-authors;
	 	for(var i = 0; i<10; i++){
	 		m-keywords[i] = get[i].value;
	 	}

	 	$.ajax({
	 		url: "/api/papers/create",
	 		type: "POST",
	 		data : {
	 			title:    m-title,
	 			abstract: m-abtract,
	 			citation: m-citations,
	 			keywords: m-keywords,
	 			authors:  m-authors,
	 			token:    m-token
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
	      console.log("wrong username or password");
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