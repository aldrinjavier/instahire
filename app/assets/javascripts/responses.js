// jQuery.fn.submitOnClick = function(){
// 	$('.edit_response input[type=submit]').remove();
// 	// listen to the button's click and its text value
// 	this.find('.is-accepted').click(function(){
// 		//if button is clicked and its text is accept, toggle it to 1 and change its text to cancel
// 		if($(this).text() == "Accept"){	
// 			//find the other button with accept text to update it to 0 as there is a new accepted offer
// 			$('.response_is_accepted').each(function() {
// 				//if the old accepted offer button is found, toggle it back to 0;
// 				if($(this).find('input').val() == "1"){
// 					$(this).find('input').val(0);
// 					$(this).parent('form').find('.is-accepted').text('Accept');
// 					$(this).parent('form').submit();
// 					return false;
// 				}
// 			});	
// 			//update now the clicked accept button to 1 and and change its text to cancel
// 			$(this).parent('form').children().find('#response_is_accepted').val(1);
// 			$(this).text('Cancel');
// 		}
// 		//if button is clicked and its text is cancel, toggle it back to 0 and change its text to accept.
// 		else{
// 			$(this).parent('form').children().find('#response_is_accepted').val(0);
// 			$(this).text('Accept');
// 		}
// 		$(this).parent('form').submit();
// 	});
// return this;
// }

// $(function() {
// 	$('.edit_response').submitOnClick();
// });

function get_name(str) {
	var last_char = "";
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == "|") {
			last_char= i
		}
	}
	return str.substring(0, last_char);
}


$(function() {
	$('.edit_response input[type=submit]').remove();
	// listen to the button's click and its text value
	var current_button = "";
	var worker_name = "";
	$('.edit_response .is-accepted').click(function(){
		//set the button that was clicked as current button
		current_button = $(this);
		//get the worker's name
		worker_name = get_name($(current_button).parentsUntil('#comments').find('.worker_offer').text());
		// alert($(this).parent().parent().parent().find('.worker_offer').text());
		
		//if button is clicked and its text is accept, toggle it to 1 and change its text to cancel
		if($(current_button).text() == "Accept"){	

			//modal confirmation
			dataConfirmModal.confirm({
				title: 'Accept offer from ' + worker_name,
				text: 'Are you sure you want to accept this offer?',
				commit: 'Yes, I am sure',
				cancel: 'Cancel',
				zIindex: 10099,
				onConfirm: function() { 	

					//update now the clicked accept button to 1 and and change its text to cancel
					$(current_button).parent('form').children().find('#response_is_accepted').val(1);
					$(current_button).text('Cancel');
					$(current_button).parent('form').submit();
				},
			});


		}
		//if button is clicked and its text is cancel, toggle it back to 0 and change its text to accept.
		else{
			//modal confirmation
			dataConfirmModal.confirm({
				title: 'Cancel offer from ' + worker_name,
				text: 'Are you sure you want to cancel this offer?',
				commit: 'Yes, I am sure',
				cancel: 'Cancel',
				zIindex: 10099,
				onConfirm: function() { 
					$(current_button).parent('form').children().find('#response_is_accepted').val(0);
					$(current_button).text('Accept');
					$(current_button).parent('form').submit();
				},
			});
		}
	});
});




// $(function() {

// 	var current_button ="";
// 	$('.edit_response input[type=submit]').remove();



// 	// listen to the button's click and its text value
// 	$('.edit_response .is-accepted').click(function(){
// 		//if button is clicked and its text is accept, toggle it to 1 and change its text to cancel
// 		current_button = $(this);




	// 	if($(this).text() == "Accept"){	
	// 		//find the other button with accept text to update it to 0 as there is a new accepted offer

	// 		dataConfirmModal.confirm({
	// 	title: 'Are you sure you want to accept this offer?',
	// 	text: 'Really do this?',
	// 	commit: 'Yes do it',
	// 	cancel: 'Not really',
	// 	zIindex: 10099,
	// 	onConfirm: function() { 
	// 		$('.response_is_accepted').each(function() {
	// 			//if the old accepted offer button is found, toggle it back to 0;
	// 			if($(this).find('input').val() == "1"){
	// 				$(this).find('input').val(0);
	// 				$(this).parent('form').find('.is-accepted').text('Accept');
	// 				$(this).parent('form').submit();
	// 				return false;
	// 			}
	// 		});	

	// 		$(current_button).parent('form').children().find('#response_is_accepted').val(1);
	// 		$(current_button).text('Cancel');
	// 	}
	// });