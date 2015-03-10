
$(document).ready(function() {
	
	
	$('#payTypeTabs a[href="#fixed-price-tab"]').tab('show');

	/*****disable users to input manually*****/
	$("#task_appointments_attributes_0_start_time").keypress(function(event) {event.preventDefault();});
	$("#task_appointments_attributes_0_end_time").keypress(function(event) {event.preventDefault();});
	$('#task_appointments_attributes_0_start_date').keypress(function(event) {event.preventDefault();});
	$('#task_appointments_attributes_0_end_date').keypress(function(event) {event.preventDefault();});
	/******end*******/

	/*****date picker, time picker, and datepair*****/
	$('#date_time .time').timepicker({
		showDuration: true,
		timeFormat: 'h:i A',
		'disableTimeRanges': [
		['1am', '2am'],
		['6am', '9am']
		]
	});
	$('#date_time .date').datepicker({
		format: 'd/m/yyyy',
		autoclose: true,
		startDate: "today"
	});
	$('#date_time').datepair();

	//Force user to input start date first by disabling the end date as long as start date is nil
	if($('input.date.start').val() == ''){
		$('input.date.end').prop('disabled', true);
		$('input.date.end').css({'background-color' : '#ffffff'});
	}else{
		$('input.date.end').prop('disabled', false);
	}
	$('input.date.start').change(function() {
		$('input.date.end').prop('disabled', false);
	});

	//Clear the value of populated input in date field after failed submission
	if($('.task_appointments_start_date.has-error').length){
		$('input.date').val('');
	}
	//Clear the value of populated input in time field after failed submission
	if($('.task_appointments_start_time.has-error').length){
		$('input.time').val('');
	}
	/******end*******/

	/*****category and subcategory dropdown*****/
	subcategories = $("#task_subcategory_id").html();
	function process_category_dropdown(){
		category = $("#task_category_id :selected").text();
		console.log(category);
		options = $(subcategories).filter('optgroup[label="'+ category +'"]').html();
		console.log(options);
		if(options){
			$('label[for=task_subcategory_id]').show();
			$("#task_subcategory_id").show(1000).html('<option value="">Please Select</option>' + options);
		}else{
			$('#task_subcategory_id').empty()
			$('label[for=task_subcategory_id]').hide();
			$('#task_subcategory_id').hide();
		}
	}
	if($("#task_subcategory_id :selected").text() == "Select a category of task"){
		$('label[for=task_subcategory_id]').hide();
		$("#task_subcategory_id").hide(); 
	}

	if($("#task_subcategory_id :selected").text() != "Select a category of task"){
		process_category_dropdown();
	}

	$("#task_category_id").change(function(){
		process_category_dropdown();
	});
	/******end*******/

	/*****location dropdown*****/
	task_areas = $("#task_area_id").html(); 
	function process_location_dropdown(){
		task_county = $("#task_county_id :selected").text();
		task_options = $(task_areas).filter('optgroup[label="'+ task_county +'"]').html();
		if(task_options){
			$('label[for=task_area_id]').show();
			$("#task_area_id").show(1000).html('<option value="">Please Select</option>' + task_options);
		}else{
			$('#task_area_id').empty()
			$('#task_area_id').hide();
		}
	}

	if($("#task_area_id :selected").text() == ""){
		$('label[for=task_area_id]').hide();
		$("#task_area_id").hide(); 
	}
	
	if($("#task_area_id :selected").text() != ""){
		process_location_dropdown();
	}

	$("#task_county_id").change(function(){
		process_location_dropdown();
	});
	/******end*******/

	/******handle errors in forms dynamically*******/
	if ($(".task_category_id.has-error").length){
		//hide subcategory error message for the first time
		$(".task_subcategory_id").children().find(".help-block").hide();
	}
		//if value is changed in category field to not empty
		//remove error message and error class in category field and show error message in category
		//else, hide error message of category field
		$("select#task_category_id").on("change", function(){
			if($(".task_category_id :selected").val()==""){
				$(".task_subcategory_id").children().find(".help-block").hide();
			}else{
				$(".task_category_id.has-error").removeClass("has-error");
				$(".task_category_id").children().find(".help-block").text("");
				$(".task_subcategory_id").children().find(".help-block").show();
			}
		});
		//remove error message and error class in subcategory field if changed to not empty
		$("select#task_subcategory_id").on("change", function(){
			if($(".task_category_id :selected").val()!=""){
				$(".task_subcategory_id.has-error").removeClass("has-error");
				$(".task_subcategory_id").children().find(".help-block").text("");
			}
		});
		/******end*******/


	});
