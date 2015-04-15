$(document).ready(function() {
	var areas = $("#user_area_id").html(); 
	
	function process_dropdown(){
		var county = $("#user_county_id :selected").text();
		console.log(county);
		var options = $(areas).filter('optgroup[label="'+ county +'"]').html();
		console.log(options);
		if(options){
			$('label[for=user_area_id]').show();
			$("#user_area_id").show().html('<option value="">Please Select</option>' + options);
		}else{
			$('#user_area_id').empty()
			$('label[for=user_area_id]').hide();
			$('#user_area_id').hide();
		}
	}

	if($("#user_area_id :selected").text() == "Please Select"){
		$('label[for=user_area_id]').hide();
		$("#user_area_id").hide(); 
	}
	
	if($("#user_area_id :selected").text() != "Please Select"){
		process_dropdown();
	}

	$("#user_county_id").change(function(){
		process_dropdown();
	});



	if( $("#selected_a_content").text() == "" ){
		$("#selected_a").text("You do not have a display photo.");
		$("#selected_a_content").hide();
		$("#selected_b").hide();
		$(".user_remove_picture").hide();
	}
	else{

		if($("#user_picture").val() == ""){
			$("#selected_b").hide();
		}else{
			$("#prof_pic").css({opacity:0.4});
			$("#selected_a").text("Previously selected: ").css({opacity:0.4});
			$("#selected_a_content").css({opacity:0.4});
			$("#selected_b").show();
			$("#selected_b").text("Photo to upload: "+$("#user_picture").val()).css("font-weight","Bold");
		}

		// $("#user_picture").val(1)

	}

	$("#user_picture").change(function(){
		// alert($("#user_picture").val());
		$("#prof_pic").css({opacity:0.4});
		if($("#selected_a_content").text() != ""){
			$("#selected_a").text("Previously selected: ").css({opacity:0.4});
			$("#selected_a_content").css({opacity:0.4});
		}
		$("#selected_b").show();
		$("#selected_b").text("Photo to upload: "+$("#user_picture").val()).css("font-weight","Bold");
	});

	// $("#user_picture").change(function(){
	// 	if($("#selected_a_content").text() != ""){
	// 		alert("not null");
	// 	}else{
	// 		alert("null");
	// 	}
	// });
	// $("#user_county_id").val($("#selected_county").text());

// $("#user_picture").val(1)
	// $("#q_subcategory_name_cont").change(function(){

	// 	if( $("#q_subcategory_name_cont").val() != ""){
	// 		string_value = $("#q_subcategory_name_cont :selected").text();
	// 		value = $("#q_subcategory_name_cont :selected").val();
	// 		console.log($("#q_subcategory_name_cont :selected").val(string_value));
	// 	}
	// });


});



