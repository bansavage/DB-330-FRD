function $(id){
	return document.getElementById(id);
}

function init(){
	var loginForm = $("form");
	loginForm.addEventListener('submit', submitForm );
	
}

function submitForm(evt){

	var username = $("inputUserName").value;
	var password = $("inputPassword").value;

	console.log("username was: " + username);
	console.log("password was: " + password);
	evt.preventDefault();
	return false;
}

