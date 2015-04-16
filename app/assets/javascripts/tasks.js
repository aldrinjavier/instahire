
$(document).ready(function() {

	$('#payTypeTabs a[href="#fixed-price-tab"]').tab('show');

	/*****disable users to input manually*****/
	$("#task_appointments_attributes_0_start_time").keypress(function(event) {event.preventDefault();});
	$('#task_appointments_attributes_0_start_date').keypress(function(event) {event.preventDefault();});
	$("#task_appointments_attributes_0_duration").keypress(function(event) {event.preventDefault();});
	/******END: disable users to input manually*******/

	/*****date picker and time picker*****/
	$('#date_time .time').timepicker({
		step: 60,
		timeFormat: 'h:i A'
	});
	$('#date_time .date').datepicker({
		autoclose: true,
		startDate: "today",
		format: 'd/m/yyyy'
	});
	/*****END: date picker and time picker*****/

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
	/*****end: date picker, time picker, and datepair*****/

	//Clear the value of populated input in date field after failed submission
	if($('.task_appointments_start_date.has-error').length){
		$('input.date').val('');
	}
	//Clear the value of populated input in time field after failed submission
	if($('.task_appointments_start_time.has-error').length){
		$('input.time').val('');
	}

	/*****category and subcategory dropdown*****/
	subcategories = $("#task_subcategory_id").html();
	function process_category_dropdown(){
		category = $("#task_category_id :selected").text();
		console.log(category);
		options = $(subcategories).filter('optgroup[label="'+ category +'"]').html();
		console.log(options);
		if(options){
			alert("hello");
			$('label[for=task_subcategory_id]').show();
			$("#task_subcategory_id").show(1000).html('<option value="">Select a subcategory</option>' + options);
		}else{
			$('#task_subcategory_id').empty()
			$('label[for=task_subcategory_id]').hide();
			$('#task_subcategory_id').hide();
		}
	}
	if($("#task_subcategory_id :selected").text() == "Select a category"){
		$('label[for=task_subcategory_id]').hide();
		$("#task_subcategory_id").hide(); 
	}

	if($("#task_subcategory_id :selected").text() != "Select a category"){
		process_category_dropdown();
	}

	$("#task_category_id").change(function(){
		process_category_dropdown();
	});
	/******END: category and subcategory dropdown*******/

	/*****location dropdown*****/
	task_areas = $("#task_area_id").html(); 
	function process_location_dropdown(){
		task_county = $("#task_county_id :selected").text();
		task_options = $(task_areas).filter('optgroup[label="'+ task_county +'"]').html();
		if(task_options){
			$('label[for=task_area_id]').show();
			$("#task_area_id").show(1000).html('<option value="">Select an area</option>' + task_options);
		}else{
			$('#task_area_id').empty()
			$('label[for=task_area_id]').hide();
			$('#task_area_id').hide();
		}
	}

	if($("#task_area_id :selected").text() == "Select a county"){
		$('label[for=task_area_id]').hide();
		$("#task_area_id").hide(); 
	}

	if($("#task_area_id :selected").text() != "Select a county"){
		process_location_dropdown();
	}

	$("#task_county_id").change(function(){
		process_location_dropdown();
	});
	/******END: location dropdown*******/

	/******handle errors in forms dynamically*******/

	//category error
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
	//title error task_title
	if ($(".task_title.has-error").length){
		$("input#task_title").on("change", function(){
			if($(this).val()!=""){
				$(".task_title.has-error").removeClass("has-error");
				$(".task_title").children().find(".help-block").text("");
			}
		});
	}
	//description error task_title
	if ($(".task_description.has-error").length){
		$("textarea#task_description").on("change", function(){
			if($(this).val()!=""){
				$(".task_description.has-error").removeClass("has-error");
				$(".task_description").children().find(".help-block").text("");
			}
		});
	}
	//location error
	if ($(".task_county_id.has-error").length){
		$(".task_area_id").children().find(".help-block").hide();
		$("select#task_county_id").on("change", function(){
			if($(".task_county_id :selected").val()==""){
				$(".task_area_id").children().find(".help-block").hide();
			}else{
				$(".task_county_id.has-error").removeClass("has-error");
				$(".task_area_id").children().find(".help-block").text("");
				$(".task_area_id").children().find(".help-block").show();
			}
		});
		$("select#task_area_id").on("change", function(){
			if($(".task_county_id :selected").val()!=""){
				$(".task_area_id.has-error").removeClass("has-error");
				$(".task_area_id").children().find(".help-block").text("");
			}
		});
	}
	//pay offer error
	if ($(".task_pay_offer.has-error").length){
		$("input#task_pay_offer").on("change", function(){
			if($(this).val()!=""){
				$(".task_pay_offer.has-error").removeClass("has-error");
				$(".task_pay_offer").children().find(".help-block").text("");
			}
		});
	}
	//start date error
	if ($(".task_appointments_start_date.has-error").length){
		$("input#task_appointments_attributes_0_start_date").on("change", function(){
			if($(this).val()!=""){
				$(".task_appointments_start_date.has-error").removeClass("has-error");
				$(".task_appointments_start_date").children().find(".help-block").text("");
			}
		});
	}
	//start time error
	if ($(".task_appointments_start_time.has-error").length){
		$("input#task_appointments_attributes_0_start_time").on("change", function(){
			if($(this).val()!=""){
				$(".task_appointments_start_time.has-error").removeClass("has-error");
				$(".task_appointments_start_time").children().find(".help-block").text("");
			}
		});
	}
	//duration error
	if ($(".task_appointments_duration.has-error").length){
		$("input#task_appointments_attributes_0_duration").on("change", function(){
			if($(this).val()!=""){
				$(".task_appointments_duration.has-error").removeClass("has-error");
				$(".task_appointments_duration").children().find(".help-block").text("");
			}
		});
	}
	/******END: handle errors*******/

	/******Bootstrap switch*******/
	/******Pay type toggle in create task form*******/
	$('#switcher').bootstrapSwitch();
	$('#switcher').bootstrapSwitch('onText', 'Hire per hour');
	$('#switcher').bootstrapSwitch('offText', 'Hire for a fixed pay');
	$('#switcher').bootstrapSwitch('onColor', 'default'); 
	$('#switcher').bootstrapSwitch('offColor', 'default'); 
	$('#switcher').bootstrapSwitch('handleWidth', '340px'); 
	$('#switcher').bootstrapSwitch('labelText', '<span class="glyphicon glyphicon-sound-stereo" aria-hidden="true"></span>');
	/******END: Toggle in Create task form*******/


	//detect state on load
	if($('#switcher').bootstrapSwitch('state')){
		//set min to 10
		$("#task_pay_offer").attr('min','10');

	}

	//detect state of is_pay_per_hour to change value
	$('input[name="task[is_pay_per_hour]"]').on('switchChange.bootstrapSwitch', function(event, state) {

		//if pay per hour
		if(state==true){

			//set min to 10
			$("#task_pay_offer").attr('min','10');
			//set its value to 10
			$("#task_pay_offer").val(10);

			//if fixed pay
		}else{

			//set min to 20
			$("#task_pay_offer").attr('min','20');
			//set its value to 20
			$("#task_pay_offer").val(20);

		}

	});

	/******Hide duration field if pay type is fixed pay, else, show it*******/
	if( !$('#switcher').is(':checked')){
		//hide duration field during the first load. The value is 0 for fixed pay
		//then the value is 1 for pay per hour
		$(".task_appointments_duration").hide();
		$("hour-addon").hide();
		$("#task_appointments_attributes_0_duration").val("0");
	}
	$('#switcher').on('switchChange.bootstrapSwitch', function (event, state) {
		if( !state){
			$(".task_appointments_duration").hide();
			$("hour-addon").hide();
			$("#task_appointments_attributes_0_duration").val("0");
		}else{
			$(".task_appointments_duration").show();
			$("hour-addon").show();
			$("#task_appointments_attributes_0_duration").val("");
		}
	}); 
	/******END*******/

	/******Pay type toggle in catalogue*******/
	$('#catalogue-switcher').bootstrapSwitch();
	$('#catalogue-switcher').bootstrapSwitch('onText', 'Hire per hour');
	$('#catalogue-switcher').bootstrapSwitch('offText', 'Hire for a fixed pay');
	$('#catalogue-switcher').bootstrapSwitch('onColor', 'primary'); 
	$('#catalogue-switcher').bootstrapSwitch('offColor', 'primary'); 
	$('#catalogue-switcher').bootstrapSwitch('handleWidth', '160px'); 
	$('#catalogue-switcher').bootstrapSwitch('labelText', '<span class="glyphicon glyphicon-sound-stereo" aria-hidden="true"></span>');
	/******END: Pay type toggle in Create task form*******/
	/******END: Bootstrap switch*******/


	// $('#new_task').on('submit', function() {
	// 	alert($('#task_appointments_attributes_0_start_date').val());
	// });

	// if ($.cookie("cookieName") !=null){
	// 	alert("may laman");
	// 	$.cookie("cookieName", "firstSet")
	// }
	// else{
	// 	alert("wala");
	// }

	//set the url to cookie
	var pathname = window.location.pathname; // Returns path only
	var url      = window.location.href; 
	$.cookie("path_name", pathname);

	// var that will determine if we are on the task page
	var at_task_page = "";

	// if we are on task page, return true, else false.
	//get the cookie "path_name"
	if($.cookie("path_name") == "/tasks/new"){
		at_task_page = true;
	}else{
		at_task_page = false;
	}

	// //set the current page to cookie
	// $.cookie("at_task", at_task_page)

	// $('.btn').on('click', function() {
	// 	// $.cookie("val_date", null, { path: '/' });
	// 	date_val = $('#task_appointments_attributes_0_start_date').val();
	// 	$.cookie("val_date", date_val);
	// 	alert($.cookie(date_val));
	// });

	// // if($.cookie("val_date") != null){
	// // 	// alert("im not null");
	// // 	$('#task_appointments_attributes_0_start_date').val($.cookie("date_val"));
	// // }

	// // v = $.cookie("val_date");
	// alert($.cookie("val_date"));
	// // $('#task_appointments_attributes_0_start_date').val(v);
	
	// // alert(v);

	// // alert(at_task_page);
});

