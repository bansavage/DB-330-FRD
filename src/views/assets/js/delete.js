

for(var i = 0; i<document.getElementsByClassName("fa-times").length; i++){
	document.getElementsByClassName("fa-times")[i].addEventListener("click", function(e){

		swal({
		  title: "Are you sure?",
		  text: "This Paper will be permanently deleted",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it!",
		  cancelButtonText: "No, cancel plx!",
		  closeOnConfirm: false,
		  closeOnCancel: false
		},
			function(isConfirm){
			  if (isConfirm) {
			    swal("Deleted!", "Paper has been deleted", "success");
			  } else {
				    swal("Cancelled", "Paper is safe and sound and not deleted :)", "error");
			  }
			});
		});
}