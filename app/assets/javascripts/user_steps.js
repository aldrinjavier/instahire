$(document).ready(function() {

	var counter = $("fieldset").length;
	// if(counter == 1){
	// 	$('.remove_fields').hide();
	// }
	
	console.log(counter);

	$('form').on('click', '.remove_fields', function(event) {
		counter--;
		console.log(counter);
		$(this).parent().find('input[type=hidden]').val('1');
		// $(this).prev('input[type=hidden]').val('1');
		$(this).closest('fieldset').hide();
		// if(counter == 1){
		// 	$('.remove_fields').hide();
		// }
		return event.preventDefault();
	});


	$('form').on('click', '.add_fields', function(event) {
		counter++;
		// if(counter >= 1){
		// 	$('.remove_fields').show();
		// }
		var regexp, time;
		time = new Date().getTime();
		regexp = new RegExp($(this).data('id'), 'g');
		$(this).before($(this).data('fields').replace(regexp, time));
		console.log(counter);
		return event.preventDefault();

	});

});
