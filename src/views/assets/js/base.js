
(function(){
	function init(){
	 	var submit = document.getElementById('db-submit');
	 	submit.addEventListener('click', submitForm );
	 }

	 function submitForm(evt){

	 	var username = document.getElementById("inputUserName").value;
	 	var password = document.getElementById("inputPassword").value;

	 	console.log("username was: " + username);
	 	console.log("password was: " + password);

	 	$.ajax({
	 		url: "/api/authenticate",
	 		type: "POST",
	 		data : {
	 			username: username,
	 			password: password
	 		},
	 		success : function(data, textStatus, jqXHR){
	 			console.log(data);
				var token = data.token;
				//Save to local storage
				localStorage.setItem("token", token);

				if (status > 400){
	        console.log("wrong username or password");
	        swal({
			  title: "<h2 style='color:#DD6B55;'>Oppps!</h2>",
			  text: "Username and/or Password was incorrect",
			  imageUrl: "../img/bad.png",
			  html: true
			});
	      }else{
					console.log("etaete");
	        window.location.href = `/controlpanel/?token=${token}`;
	      }
	      console.log(textStatus);
	      return true;
	    },
	    error : function(jqXHR, textStatus, errorThrown){
	      console.log("wrong username or password");
	      console.log(textStatus);
	      swal({
			  title: "<h2 style='color:#DD6B55;'>Oppps!</h2>",
			  text: "Username and/or Password was incorrect",
			  imageUrl: "../assets/img/bad.png",
			  html: true });
	    }
	 	});
	 	//evt.preventDefault();
	 	return false;
	 }

	 init();
 })();
