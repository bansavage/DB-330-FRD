(function(){

  //Removes token and returns user to login screen
  var logout = function(){
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  var logoutEl = document.getElementsByClassName('fa-sign-out')[0];
  logoutEl.addEventListener('click', function(e){
    e.preventDefault();
    logout();
  });
})();
