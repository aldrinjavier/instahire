$(function() {
	var count = $("fieldset").size();
	function display_message_for_nil_fieldset(){
		if(count < 1){
			$("#nil_element_warning").show();
		}else{
			$("#nil_element_warning").hide();
		}
	};

	// count the no of fieldset
	var count = $("fieldset").size();
	display_message_for_nil_fieldset();


	$(document).on('click', '.add_fields', function(){
		count++;
		display_message_for_nil_fieldset();

		$(".is-currently-working").each(function(){
			if($(this).prop( "checked")){
				$(this).parents().eq(5).find($(".user_works_date_finished")).hide();
				$(this).parents().eq(5).find($(".to-present")).show();
			}else{
				$(this).parents().eq(5).find($(".user_works_date_finished")).show();
				$(this).parents().eq(5).find($(".to-present")).hide();
			}
		});
	});

	$(document).on('click', '.remove_fields', function(){
		count--;
		display_message_for_nil_fieldset();
	});

	$("#is_task_pay_per_hour").hide();
	if($("#is_task_pay_per_hour").text() == "false"){
		$(".appointment_duration").hide();
	}


});