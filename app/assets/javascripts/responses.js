jQuery.fn.submitOnClick = function(){
	$('.edit_response input[type=submit]').remove();
	//if accept button is clicked, toggle to 1 else togge to 0 
	this.find('.is-accepted').click(function(){
		if($(this).text() == "Accept"){
			$('.response_is_accepted').each(function() {
				if($(this).find('input').val() == "1"){
					$(this).find('input').val(0);
					$(this).parent('form').find('.is-accepted').text('Accept');
				}
				$(this).parent('form').submit();
			});
			$(this).parent('form').children().find('#response_is_accepted').val(1);
			$(this).text('Cancel');
		}else{
			$(this).parent('form').children().find('#response_is_accepted').val(0);
			$(this).text('Accept');
		}
		$(this).parent('form').submit();
	});
	return this;
}

$(function() {
	$('.edit_response').submitOnClick();
});


// $(function() {
// 	$('.edit_response input[type=submit]').remove();
// 	//if accept button is clicked, toggle to 1 else togge to 0 
// 	$('.edit_response .is-accepted').click(function(){
// 		if($(this).text() == "Accept"){
// 			$('.response_is_accepted').each(function() {
// 				if($(this).find('input').val() == "1"){
// 					$(this).find('input').val(0);
// 					$(this).parent('form').find('.is-accepted').text('Accept');
// 				}
// 				$(this).parent('form').submit();
// 			});
// 			$(this).parent('form').children().find('#response_is_accepted').val(1);
// 			$(this).text('Cancel');
// 		}else{
// 			$(this).parent('form').children().find('#response_is_accepted').val(0);
// 			$(this).text('Accept');
// 		}
// 		$(this).parent('form').submit();
// 	});
// });

