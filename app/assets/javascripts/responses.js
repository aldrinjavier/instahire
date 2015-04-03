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


$(function() {
	$('.edit_response input[type=submit]').remove();
	// listen to the button's click and its text value
	$('.edit_response .is-accepted').click(function(){
		//if button is clicked and its text is accept, toggle it to 1 and change its text to cancel
		if($(this).text() == "Accept"){	
			//find the other button with accept text to update it to 0 as there is a new accepted offer
			$('.response_is_accepted').each(function() {
				//if the old accepted offer button is found, toggle it back to 0;
				if($(this).find('input').val() == "1"){
					$(this).find('input').val(0);
					$(this).parent('form').find('.is-accepted').text('Accept');
					$(this).parent('form').submit();
					return false;
				}
			});	
			//update now the clicked accept button to 1 and and change its text to cancel
			$(this).parent('form').children().find('#response_is_accepted').val(1);
			$(this).text('Cancel');
		}
		//if button is clicked and its text is cancel, toggle it back to 0 and change its text to accept.
		else{
			$(this).parent('form').children().find('#response_is_accepted').val(0);
			$(this).text('Accept');
		}
		$(this).parent('form').submit();
	});
});

