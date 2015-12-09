(function(){
  var token = localStorage.getItem("token");

  var init = function(){

    $.ajax({
      url: `/api/users`,
      type: "GET",
      headers: {
        'x-access-token': token
      },
      success : function(data, textStatus, jqXHR){
        if (status > 400){
          //window.location.href = `/login`;
        }else{
          setupPage(data);
        }
        console.log(textStatus);
        return true;
      },
      error : function(jqXHR, textStatus, errorThrown){
        console.log(textStatus);
        window.location.href = `/login`;
      }
    });
    listenOnATags();
  }

  var setupPage = function(data){
    var el = document.getElementById("db-menu-dropdown");
    el.innerText = data.fName + " " + data.lName;
  }

  var listenOnATags = function(){
    var aTags = document.getElementsByTagName("a");
    for(var i = 0; i < aTags.length-1; i++){
      aTagEventListenerAdd(aTags, i)
    }
  }

  //Separates it so the index can be perssisted
  var aTagEventListenerAdd = function(aTags, index){
    aTags[index].addEventListener('click', function(e){
      e.preventDefault();
      goWithToken(aTags[index].getAttribute('href'));
    });
  }

  // Acts just like the user clicked on the a tag, but attaches the token to the request
  var goWithToken = function(href){
    console.log(href);
    window.location.href = `${href}?token=${token}`;
  }

  init();
})();
