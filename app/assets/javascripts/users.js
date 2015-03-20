$(document).ready(function() {
	areas = $("#user_area_id").html(); 
	
	function process_dropdown(){
		county = $("#user_county_id :selected").text();
		console.log(county);
		options = $(areas).filter('optgroup[label="'+ county +'"]').html();
		console.log(options);
		if(options){
			$('label[for=user_area_id]').show();
			$("#user_area_id").show().html('<option value="">Please Select</option>' + options);
		}else{
			$('#user_area_id').empty()
			$('#user_area_id').hide();
		}
	}

	if($("#user_area_id :selected").text() == ""){
		$('label[for=user_area_id]').hide();
		$("#user_area_id").hide(); 
	}
	
	if($("#user_area_id :selected").text() != ""){
		process_dropdown();
	}

	$("#user_county_id").change(function(){
		process_dropdown();
	});

	// when value in dropdown changed, post
	$('#q_subcategory_id_eq').change(function() {
		this.form.submit();
	});

	$('#q_subcategory_category_id_eq').change(function() {
		this.form.submit();
	});

	


	// $("#q_subcategory_name_cont").change(function(){

	// 	if( $("#q_subcategory_name_cont").val() != ""){
	// 		string_value = $("#q_subcategory_name_cont :selected").text();
	// 		value = $("#q_subcategory_name_cont :selected").val();
	// 		console.log($("#q_subcategory_name_cont :selected").val(string_value));
	// 	}
	// });


});



