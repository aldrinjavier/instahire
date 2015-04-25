$(document).ready(function() {


	$("#delete_pic").click(function(){
		$("#user_remove_picture").val(1);
		$("#user_remove_picture").closest("form").submit();
		$.cookie("has_picture", "true");
	});

	if ($(".prof_pic").attr("alt") == "Default"){
		$("#selected_a").text("Set your profile picture");
		$("#delete_pic").hide();
	}else{
		$("#selected_a").text("Browse to change your profile picture or");
		$("#delete_pic").show();
	}

	$("#user_picture").change(function(){	
		$(this).closest("form").submit();
		$.cookie("has_picture", "true");
	});

	// if( window.location.href == "http://localhost:3000/worker_steps/education_experience"){
	// 	window.location.replace("http://stackoverflow.com");
	// }

	// if ($("#user_picture").val() == ""){
	// 	$.cookie("has_picture", null);
	// }

	// if($.cookie("has_picture") !== null){
	// 	window.location.replace("/worker_steps/basic_info");
	// }
	

	var counter = $("fieldset").length;
	// if(counter == 1){
	// 	$('.remove_fields').hide();
	// }
	
	console.log(counter);



	// DISPLAY REQUIRED ICON
	function required_icon(){
		$('.required-icon').tooltip({
			placement: 'left',
			title: 'Required!'
		});
	}

	required_icon();

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
		required_icon();
		return event.preventDefault();


	});

});
