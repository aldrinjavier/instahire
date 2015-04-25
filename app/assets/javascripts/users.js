$(document).ready(function() {

	function get_name(str) {
		var last_char = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) == "|") {
				last_char= i
			}
		}
		return str.substring(0, last_char);
	}

	$("#to-present").hide();
	// hide date-finished field if is currently working
	$(document).on('click', '.is-currently-working', function(){
		if( this.checked){
			// make the date finished field empty when check box is clicked
			$(this).parents().eq(5).find($(".user_works_date_finished")).find($(".profile-date option[value='']")).attr('selected', true);
			$(this).parents().eq(5).find($(".user_works_date_finished")).hide();
			$(this).parents().eq(5).find($(".to-present")).show();
			$(this).parents().eq(5).find($("#required-finished-date")).hide();

		}else{
			$(this).parents().eq(5).find($(".user_works_date_finished")).show();
			$(this).parents().eq(5).find($(".to-present")).hide();
			$(this).parents().eq(5).find($("#required-finished-date")).show();
		}
	});
	// the state of checkbox will retain if reloaded or refreshed
	$(".is-currently-working").each(function(){
		if($(this).prop( "checked")){
			$(this).parents().eq(5).find($(".user_works_date_finished")).hide();
			$(this).parents().eq(5).find($(".to-present")).show();
			$(this).parents().eq(5).find($("#required-finished-date")).hide();
		}else{
			$(this).parents().eq(5).find($(".user_works_date_finished")).show();
			$(this).parents().eq(5).find($(".to-present")).hide();
			$(this).parents().eq(5).find($("#required-finished-date")).show();
		}
	});
	

	var areas = $("#user_area_id").html(); 
	
	function process_dropdown(){
		var county = $("#user_county_id :selected").text();
		console.log(county);
		var options = $(areas).filter('optgroup[label="'+ county +'"]').html();
		console.log(options);
		if(options){
			$('label[for=user_area_id]').show();
			$("#user_area_id").show().html('<option value="">Select area where you are located</option>' + options);
			$("#required-area").show();
		}else{
			$('#user_area_id').empty()
			$('label[for=user_area_id]').hide();
			$('#user_area_id').hide();
			$("#required-area").hide();
		}
	}

	if($("#user_area_id :selected").text() == "Select area where you are located"){
		$('label[for=user_area_id]').hide();
		$("#user_area_id").hide(); 
		$("#required-area").hide();
	}
	
	if($("#user_area_id :selected").text() != "Select area where you are located"){
		process_dropdown();
	}

	$("#user_county_id").change(function(){
		process_dropdown();
	});

	// alert($("#user_area_id :selected").text());
	// alert($("#user_county_id :selected").text());

	function hide_submit_button_basic_info(){
		if($("#user_area_id").is(":visible") && $("#user_area_id :selected").text() != "Select area where you are located"){
			$("#user_area_id").closest('form').find(':submit').prop('disabled', false);
		}else{
			$("#user_area_id").closest('form').find(':submit').prop('disabled', true);
		}
	}

	hide_submit_button_basic_info();
	$("#user_area_id").change(function(){
		hide_submit_button_basic_info();
	});

	$('.article').readmore({
		maxHeight: 80,
		speed: 250,
		moreLink: '<a href="#" class="read-more-link">Read more...</a>',
		lessLink: '<a href="#">Read less</a>'

	});

	$('.article').readmore();


	



});



