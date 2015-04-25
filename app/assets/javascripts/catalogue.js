$(document).ready(function() {


	//variables responsible for filter result string builder 
	var selected_category = "";
	var selected_subcategory = "";
	var selected_county = "";
	var selected_area = "";
	var selected_pay = "";
	var filter_result_builder = "";
	var max = "";
	var min = "";
	var search_text = "";
	
	/*****HELPER FUNCTIONS*****/
	//return all chaaracters except count
	function remove_count(str) {
		var last_char = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) == "(") {
				last_char= i-1 
			}
		}
		return str.substring(0, last_char);
	}
	//return count
	function get_count(str) {
		var last_char = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) == "(") {
				last_char= i
			}
		}
		return str.substring(last_char);
	}
	//add up count
	function add_count(str){
		var start = "";
		var end = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) == "(") {
				start = i+1;
				end = i+2;
			}
		}
		if(start != "" && end != ""){
			return parseInt(str.substring(start, end));
		}else{
			return 0;
		}
	}
	//holds the sum of all item's count in category dropdown
	var total_count = 0;
	//iterate dropdown items to get the total sum in category dropdown
	//will be applied to all filter's default item. ie: location, paytype
	$('#q_subcategory_category_id_eq option').each(function(){
		total_count += add_count(this.text);
	});
	/*****END: HELPER FUNCTIONS*****/

	/*****catalogue link in header*****/
	$('a[href="/catalogues/search"], a[href="/catalogues"]').click(function(){
		$("form#task_search").submit();
	}); 
	/*****END: catalogue link in header*****/

	/*****FILTERS*****/
	/*****pay filter dropdown*****/
	if($("#q_is_pay_per_hour_eq_any :selected").text() != "All pay types"){
		//holds the selected pay type
		selected_pay = remove_count($("#q_is_pay_per_hour_eq_any :selected").text());
	}
	//set pay type dropdown default option (with total sum count of all pay types)
	$("#q_is_pay_per_hour_eq_any option:first-child").text("All pay types (" + total_count + ")" );
	// if pay type dropdown is not selected, hide all pay types return button
	if(remove_count($("#q_is_pay_per_hour_eq_any :selected").text()) == "All pay types"){
		$("#all-pay-types").hide();
	}else{ //else, show all pay types return button, hide pay dropdown and its label
		$("#all-pay-types").show();
		$("#q_is_pay_per_hour_eq_any").hide();
		$('label[for=q_is_pay_per_hour_eq_any]').hide();
	}
	/*****END: pay filter dropdown*****/

	/*****category filter dropdown*****/
	// $("#q_is_pay_per_hour_eq_any").change(function(){
	// 	selected_pay = remove_count($("#q_is_pay_per_hour_eq_any :selected").text());
	// 	alert(selected_pay);
	// });
f_subcategories = $("#q_subcategory_id_eq").html();
function f_process_category_dropdown(){
		//set category dropdown default option (with total sum count of all categories)
		$("#q_subcategory_category_id_eq option:first-child").text("All categories (" + total_count + ")" );
		//holds the selected category
		f_category = remove_count($("#q_subcategory_category_id_eq :selected").text());
		console.log(f_category);
		//holds all subcategory items of selected category
		f_options = $(f_subcategories).filter('optgroup[label="'+ f_category +'"]').html();
		console.log(f_options);
		//hide all categories return button
		$("#all-categories").hide();
		//hide all subcategories return button
		$("#all-subcategories").hide();
		//hide selected subcategory item
		$("#subcategory-item").hide();
		//if f_options is not empty, a category drop down item was selected
		//if a category drop down item is selected
		if(f_options){
			selected_category = remove_count($("#q_subcategory_category_id_eq :selected").text());
			//hide category dropdown label
			$('label[for=q_subcategory_category_id_eq]').hide();
			//hide category dropdown
			$("#q_subcategory_category_id_eq").hide();
			//show all categories return button	
			$("#all-categories").show();
			//show subcategory dropdown label
			$('label[for=q_subcategory_id_eq]').show();
			//set subcategory dropdown label to selected category's name
			$('label[for=q_subcategory_id_eq]').text(remove_count($("#q_subcategory_category_id_eq :selected").text()));
			//set the default option (with total sum count of all subcategories) and show all the subcategories of the selected category
			$("#q_subcategory_id_eq").show(1000).html('<option value="">All '+ get_count($('#q_subcategory_category_id_eq :selected').text())+'</option>' + f_options);
			//if a subcategory dropdown item is selected
			if(remove_count($("#q_subcategory_id_eq :selected").text()) != "All"){
				selected_subcategory = remove_count($("#q_subcategory_id_eq :selected").text());
				//hide subcategory drop down label
				$('label[for=q_subcategory_id_eq]').hide();
				//hide subcategory drop down 
				$('#q_subcategory_id_eq').hide();
				//show all subcategories return button
				$("#all-subcategories").show();
				//set the text of subcategories return button to selected subcategory's name
				$("#all-subcategories").text("<< " +remove_count($("#q_subcategory_category_id_eq :selected").text()));
				//show the selected subcategory item
				$("#subcategory-item").show();
				//set the text of subcategory item to selected subcategory's name
				$("#subcategory-item").text($("#q_subcategory_id_eq :selected").text());
			}
			//if a subcategory dropdown item is not selected
		}else{
			//empty first the subcategory drop down
			$('#q_subcategory_id_eq').empty()
			//hide subcategory dropdown label
			$('label[for=q_subcategory_id_eq]').hide();
			//hide subcategory dropdown
			$('#q_subcategory_id_eq').hide();
		}
	}

	// if($("#q_subcategory_category_id_eq :selected").text() == "All categories"){
	// 	$('label[for=q_subcategory_id_eq]').hide();
	// 	$("#q_subcategory_id_eq").hide(); 
	// }

	//if subcategory dropdown is selected 
	if($("#q_subcategory_id_eq :selected").text() != "All"){
		f_process_category_dropdown();
	}
	//if category dropdown item is selected 
	$("#q_subcategory_category_id_eq :selected").change(function(){
		f_process_category_dropdown();
	});

	/*****END: category filter dropdown*****/

	/*****location filter dropdown*****/
	f_task_areas = $("#q_area_id_eq").html(); 
	function f_process_location_dropdown(){
		//set county dropdown default option (with total sum count of all counties)
		$("#q_area_county_id_eq option:first-child").text("All counties (" + total_count + ")" );
		//holds the selected county
		f_task_county = remove_count($("#q_area_county_id_eq :selected").text());
		//holds all area items of selected county
		f_task_options = $(f_task_areas).filter('optgroup[label="'+ f_task_county +'"]').html();
		//hide all counties return button
		$("#all-counties").hide();
		//hide all areas return button
		$("#all-areas").hide();
		//hide selected area item
		$("#area-item").hide();
		//if f_task_options is not empty, a county drop down item was selected
		//if a county drop down item is selected
		if(f_task_options){
			selected_county = remove_count($("#q_area_county_id_eq :selected").text());
			//hide county dropdown label
			$('label[for=q_area_county_id_eq]').hide();
			//hide county dropdown
			$("#q_area_county_id_eq").hide();
			//show all counties return button	
			$("#all-counties").show();
			//show area dropdown label
			$('label[for=q_area_id_eq]').show();
			// //set area dropdown label to selected category's name
			$('label[for=q_area_id_eq]').text(remove_count($("#q_area_county_id_eq :selected").text()));
			//set the default option (with total sum count of all areas) and show all the area of the selected county
			$("#q_area_id_eq").show(1000).html('<option value="">All '+ get_count($('#q_area_county_id_eq :selected').text())+'</option>' + f_task_options);
			//if an area dropdown item is selected
			if(remove_count($("#q_area_id_eq :selected").text()) != "All"){
				selected_area = remove_count($("#q_area_id_eq :selected").text());
				//hide area drop down label
				$('label[for=q_area_id_eq]').hide();
				//hide area drop down 
				$('#q_area_id_eq').hide();
				//show all areas return button
				$("#all-areas").show();
				//set the text of areas return button to selected area's name
				$("#all-areas").text("<< " +remove_count($("#q_area_county_id_eq :selected").text()));
				//show the selected subcategory item
				$("#area-item").show();
				//set the text of subcategory item to selected subcategory's name
				$("#area-item").text($("#q_area_id_eq :selected").text());
			}
			//if a subcategory dropdown item is not selected
		}else{
			//empty first the area drop down
			$('#q_area_id_eq').empty()
			//hide area dropdown label
			$('label[for=q_area_id_eq]').hide();
			//hide area dropdown
			$('#q_area_id_eq').hide();
		}
	}
	// if($("#q_area_id_eq :selected").text() == "All counties"){
	// 	$('label[for=q_area_id_eq]').hide();
	// 	$("#q_area_id_eq").hide(); 
	// }

	

	var is_search_clicked_and_string_present = false;

	// hide sql query text
	$("#sql_search").hide();

	// assign it to a var
	var sql_search = $("#sql_search").text();

	// detect if search button was clicked and a string is present
	//  if it returns string "like", it is true
	if (sql_search.indexOf('LIKE') > -1) {
		is_search_clicked_and_string_present = true;
	} else {
		is_search_clicked_and_string_present = false;
	}

	// if search text contains a text && is_search_clicked_and_string_present is true, 
	// get the value of the text string
	if($("#q_title_or_description_cont").val()){
		if(is_search_clicked_and_string_present){	
			// assign to search_text
			search_text = $("#q_title_or_description_cont").val();
		}

	}

	if($("#q_area_id_eq :selected").text() != "All"){
		f_process_location_dropdown();
	}
	$("#q_area_county_id_eq :selected").change(function(){
		f_process_location_dropdown();
	});
	/******END: location filter dropdown*******/

	/******Update query filter if form fields changed*******/
	//all filter forms
	$('#q_subcategory_id_eq, #q_subcategory_category_id_eq, #q_is_pay_per_hour_eq_any, #q_area_county_id_eq, #q_area_id_eq').change(function() {
		this.form.submit();

	});

	//refresh button for min and max form
	$('#refresh-button').click(function(){

		this.form.submit();
	});
	//all categories return button
	$('#all-categories').on('click', function(){

		$('#q_subcategory_category_id_eq').val(0);
		$('#q_subcategory_id_eq').val(0);
		this.form.submit();
	});
	//all subcategories return button
	$('#all-subcategories').on('click', function(){
		$('#q_subcategory_id_eq').val(0);
		this.form.submit();
	});
	//all counties return button
	$('#all-counties').on('click', function(){
		$('#q_area_county_id_eq').val(0);
		$('#q_area_id_eq').val(0);
		this.form.submit();
	});
	//all counties return button
	$('#all-areas').on('click', function(){
		$('#q_area_id_eq').val(0);
		this.form.submit();
	});
	//all pay types return button
	$('#all-pay-types').on('click', function(){
		$('#q_is_pay_per_hour_eq_any').val(0);
		this.form.submit();
	});

	/******END: Update query filter if form fields query changed*******/

	
	/******END: Set text value of pay type dropdown filter*******/
	/*****END: FILTERS*****/
	max = $('#q_pay_offer_lteq').val();
	min = $('#q_pay_offer_gteq').val();

	/******filter result string builder*******/
	filter_result_builder = "All " + total_count + " " + selected_pay + " task-listings ";
	filter_result_builder_copy = "";
	if(selected_category != ""){
		filter_result_builder_copy = filter_result_builder;
		filter_result_builder = selected_category + ": " + filter_result_builder;
	}
	if(selected_subcategory != ""){
		filter_result_builder = selected_subcategory + ": " + filter_result_builder_copy;
	}
	if(selected_county != ""){
		filter_result_builder_copy = filter_result_builder;
		filter_result_builder = filter_result_builder + " in " + selected_county;
	}
	if(selected_area != ""){
		filter_result_builder = filter_result_builder_copy + " in " + selected_area;
	}
	if(min != "" && max != ""){
		if(min == max){
			filter_result_builder = filter_result_builder + " for €" + min;
		}
		else{
			filter_result_builder = filter_result_builder + " between €" + min + " and €" + max;
		}
	}
	if((min == "" && max != "") || (min != "" && max == "") ){
		if(min != ""){
			filter_result_builder = filter_result_builder + "€ " + min +" and above";
		}else{
			filter_result_builder = filter_result_builder + "€ " + max +" and under";
		}
	}
	if(search_text != ""){
		filter_result_builder = filter_result_builder + " containing the term " + search_text;
	}

	$("#filter-result-display").text(filter_result_builder);
	/******END: filter result string builder*******/

	//set min and max field to 10, default min value is 10 (so no need to set)
	if(remove_count($("#q_is_pay_per_hour_eq_any :selected").text()) == "Pay per hour"){
		// if($('#q_pay_offer_gteq').val() == ""){
		// 	$('#q_pay_offer_gteq').val(10);
		// }
		// if($('#q_pay_offer_lteq').val() == ""){
		// 	$('#q_pay_offer_lteq').val(10);
		// }
		//change text in the label
		$("#minimum-label").text("Minimum pay per hour");
		$("#maximum-label").text("Maximum pay per hour");
		//set min and max field to 20, and min value to 20
	}else if(remove_count($("#q_is_pay_per_hour_eq_any :selected").text()) == "Fixed pay"){
		$('#q_pay_offer_gteq').attr({"min" : 20});
		$('#q_pay_offer_lteq').attr({"min" : 20});
		// if($('#q_pay_offer_gteq').val() == ""){
		// 	$('#q_pay_offer_gteq').val(20);
		// }
		// if($('#q_pay_offer_lteq').val() == ""){
		// 	$('#q_pay_offer_lteq').val(20);
		// }
		//change text in the label
		$("#minimum-label").text("Minimum fixed pay");
		$("#maximum-label").text("Maximum fixed pay");
		//set min and max field to 10, default min value is 10 (no need to set)
	}
	// else{ 
	// 	if($('#q_pay_offer_gteq').val() == ""){
	// 		$('#q_pay_offer_gteq').val(10);
	// 	}
	// 	if($('#q_pay_offer_lteq').val() == ""){
	// 		$('#q_pay_offer_lteq').val(10);
	// 	}
	// }
	//restrict min field from inputting value greater than value in max field
	$('#q_pay_offer_gteq').on('change', function(){
		if(parseInt($(this).val()) > parseInt($('#q_pay_offer_lteq').val()) ){
			$(this).val($('#q_pay_offer_lteq').val());		
		}
	});
	//restrict max field from inputting value less than value in min field
	$('#q_pay_offer_lteq').on('change', function(){
		if(parseInt($(this).val()) < parseInt($('#q_pay_offer_gteq').val()) ){
			$(this).val($('#q_pay_offer_gteq').val());
		}
	});
});