(function(){

	//WEIRD STUFF GOIN ONS/*
	/*
	function getAuthors(){

		var m_token ="";
	 	if( localStorage.getItem("token") ){
	 		m_token = localStorage.getItem("token");
	 	}
		$.ajax({
	 		url: `/api/users/all?token=${m_token}`,
	 		type: "GET",
	 		async:
	 		success : function(data, textStatus, jqXHR){

	 			return JSON.stringify(data);


	 			if (status > 400){
			        console.log("Failed");
			   		window.location.href = `/controlpanel/?token=${m_token}`;
				}
			}
	    });
	}

*/

	function init(){

  	 	var submit = document.getElementById('db-add');
  	 	var add_key = document.getElementsByClassName('add-key')[0];
  	 	submit.addEventListener('click', create );
  	 	add_key.addEventListener('click', addKey);

  	 	console.log("added Event add auth");

      createDropDown();
	}

  //Creates the dropdown withs a trigger button
   function createDropDown() {

     var options = "";

     var dropdownHTML = `<label for="state">State</label>
                           <select id="state">
                             <option>AL</option>
                           </select>`;

     getAuthors(function(data){
       data.forEach(function(author, index, arr){

         options += `<option data-id=${author.users_id}>${author.fName}</option>`
         if (index >= arr.length-1){
           var dropdownHTML = `<label for="state">State</label>
                                 <select id="state">
                                   ${options}
                                 </select>`;

          document.body.innerHTML += dropdownHTML;
         }
       });
     });



   }

   //What happens when the button is pressed
   function trigger() {

   }

   function getAuthors(callback){

     var m_token ="";
     if( localStorage.getItem("token") ){
       m_token = localStorage.getItem("token");
     }
     $.ajax({
       url: `/api/users/all?token=${m_token}`,
       type: "GET",
       success : function(data, textStatus, jqXHR){
         console.log(data);

         if (status > 400){
               console.log("Failed");
             window.location.href = `/controlpanel/?token=${m_token}`;
         }else{
           callback(JSON.parse(data));
         }
       }
       });
     }

	 init();
 })();
