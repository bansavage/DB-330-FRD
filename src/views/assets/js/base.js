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
			return true;
			var token = data.token;
			//Save to local storage
			localStorage.setItem("token", token);

			if (data.success){
				$.ajax({
						url: "http://localhost:7000/controlpanel",
						data: {token: token},
						type: "GET",
					}
				);
				return true;
			};
 		},
 		error : function(jqXHR, textStatus, errorThrown){
			if (status > 400){
				console.log(textStatus);
			}
			console.log(textStatus);
 		}
 	});
 	//evt.preventDefault();
 	return false;
 }
