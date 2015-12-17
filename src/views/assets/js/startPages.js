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
    var current_user = document.createTextNode( data.fName + " " + data.lName + " ");
    var icon = document.createElement("i");
    var welcomeMsg = document.createTextNode("Welcome Back " + data.fName + "!");

    icon.classList.add("fa");
    icon.classList.add("fa-user");

    
    el.appendChild(current_user);
    el.appendChild(icon);
    if(document.getElementsByClassName("banner-head")[0]){
      document.getElementsByClassName("banner-head")[0].appendChild( welcomeMsg );
    }
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
    var token = localStorage.getItem("token");
    //Checks to see if the next page is authorized
    $.ajax({
      url: `${href}`,
      type: "GET",
      headers: {
        'x-access-token': token
      },
      success : function(data, textStatus, jqXHR){
        if (status > 400){
          //window.location.href = `/login`;
          console.log(data);
          swal({
            title: "<h2 style='color:#DD6B55;'>This Page is Unaccessable</h2>",
    			  text: "Quick Fixes: Try adding a paper.",
    			  imageUrl: "../assets/img/bad.png",
    			  html: true
          });
        }else{
          window.location.href = `${href}?token=${token}`;
        }
        console.log(textStatus);
        return true;
      },
      error : function(jqXHR, textStatus, errorThrown){
        console.log(textStatus);
        swal({
  			  title: "<h2 style='color:#DD6B55;'>This Page is Unaccessable</h2>",
  			  text: "Quick Fixe: Try adding a paper.",
  			  imageUrl: "../assets/img/bad.png",
  			  html: true
        });
      }
    });
  }

  init();
})();
