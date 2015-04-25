$(function() {

	/*****Question or negotiation*****/

	//var to determine if question or negotation was clicked
	var is_question = "";
	
	//hide switch-collapse button on load
	$('#switch-collapse').hide();

	//ask question button on click
	$('#ask-question').click(function(){
		
		//default: disable submit button. ie: needs to input at least 15 char to enable it
		$('#create_response_button').prop("disabled",true);

		//update the submit button value
		$('#create_response_button').val("Post your question");
		
		// set is_question to true
		is_question = true;
		
		// change switch-button-text to Switch to negotiate pay
		$('#switch-collapse').html("Switch to negotiate pay");
		
		//hide ask question button
		$(this).hide();
		
		//hide negotiate pay button
		$('#negotiate').hide();
		
		//show switch button
		$('#switch-collapse').show();
		
		//hide negotiate pay field
		$('#response_negotiate_pay').hide();
		$('#negotiate-field').hide();
		
		//change the value of response_is_comment field to true
		$('#response_is_comment').val(1);
		
		//change placeholder value
		$('#response_comment_text').attr('placeholder', 'Ask question if you want to know further information about the task or to request a change on its information to make it possible for you to do it.');
		
		//change hint value
		$('#comment_text_hint').text("enter at least 15 characters");
	});

	//negotiate button on click
	$('#negotiate').click(function(){
		
		//always set the default val to min value when negotiate button is clicked
		$('#response_negotiate_pay').val($('#response_negotiate_pay').attr('min'));

		//always update thehint text and its color
		$('#negotiation_pay_hint').text("match the pay offer or demand a pay raise").css('color', 'gray');
		
		//disable submit button
		$('#create_response_button').prop("disabled",false);

		//update the submit button value
		$('#create_response_button').val("Negotiate your pay");
		
		// set is_question to false
		is_question = false;
		
		// change switch-button-text to Switch to question
		$('#switch-collapse').html("Switch to question");
		
		//hide negotiate pay button
		$(this).hide();
		
		//show switch button
		$('#switch-collapse').show();
		
		//hide ask-question button
		$('#ask-question').hide();
		
		//show negotiate pay field
		$('#response_negotiate_pay').show();
		$('#negotiate-field').show();
		
		//change the value of response_is_comment field to false
		$('#response_is_comment').val(0);
		
		//change placeholder value
		$('#response_comment_text').attr('placeholder', 'Enter a comment here (optional)');
		
		//change hint value
		$('#comment_text_hint').text("");
	});

	//switch button on click
	$('#switch-collapse').click(function(){

		// if var is_question true, switch to negotiate pay
		if(is_question){
			//clear the text field evertime button is clicked
			$('#response_comment_text').val("");

			//negotiate pay, change the value to false
			$('#response_is_comment').val(0);

			//update the submit button value
			$('#create_response_button').val("Negotiate your pay");

			// no need to disable submit button
			$('#create_response_button').prop("disabled",false);

			// set to false
			is_question = false;

			//set button text
			$(this).html("Switch to question");

			//show negotiate pay field
			$('#response_negotiate_pay').show();
			$('#negotiate-field').show();

			//change placeholder value
			$('#response_comment_text').attr('placeholder', 'Enter a condition here (optional)');

			//change hint value
			$('#comment_text_hint').text("");
		}

		// if var is_question false, switch to question
		else{
			//clear the text field evertime button is clicked
			$('#response_comment_text').val("");

			//comment, change the value of to true
			$('#response_is_comment').val(1);

			//update the submit button value
			$('#create_response_button').val("Post your question");

			//disable submit button
			$('#create_response_button').prop("disabled",true);

			//set to true
			is_question = true;

			//set button text
			$(this).html("Switch to negotiate pay");

			// hide negotiate pay field
			$('#response_negotiate_pay').hide();
			$('#negotiate-field').hide();

			//show comment text field
			$('#response_comment_text').show();

			//change placeholder value
			$('#response_comment_text').attr('placeholder', 'Ask question if you want to know further information about the task or to request a change on its details to make it possible for you to do it.');
			
			//change hint value 
			$('#comment_text_hint').text("enter at least 15 characters");
		}
	});

	// return hide-subcomment id
	function get_hide_response_subcomment_form_id(str) {
		var last_char = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) == "x") {
				last_char= i +1
			}
		}
		return str.substring(last_char);
	}

	// hide hide_subcomment link on load
	$(".hide_subcomment_link").hide();

	// hide_subcomment_link on click listener
	// $(".hide_subcomment_link").click(function(){

	// 	//get the id of hide_subcomment_link 
	// 	subcomment_f_id = get_hide_response_subcomment_form_id($(this).attr('id'));

	// 	//hide subcomments on clicked response
	// 	$("#response-comment-section"+subcomment_f_id).hide();

	// 	//hide subcomment form
	// 	$("#hide_subcomment_formx"+subcomment_f_id).hide();

	// 	//show reply link
	// 	$("#new_subcomment"+subcomment_f_id).show();
	// });

$(".hide_subcomment_link").click(function(){

		//get the id of hide_subcomment_link 
		subcomment_f_id = get_hide_response_subcomment_form_id($(this).attr('id'));

		//hide subcomments on clicked response
		$("#response-comment-section"+subcomment_f_id).hide();

		//hide subcomment form
		$("#hide_subcomment_formx"+subcomment_f_id).hide();

		//show reply link
		$("#reply_and_replies_count"+subcomment_f_id).show();
	});


	//update character count every time input changes in response-comment-text field
	$('#response_comment_text').on('input', function() {

		//if question only. This does not apply to negotiation pay
		if(is_question){

			//user required to input at least 15 char
			//also detects if input is space. If input is space, dont include it.	
			if(parseInt($(this).val().replace(/ /g,'').length) > 14){
				$('#create_response_button').prop("disabled",false);

				//remove hint
				$('#comment_text_hint').text("");
			}	

			else if(parseInt($(this).val().replace(/ /g,'').length) == 0){

				//update hint value
				$('#comment_text_hint').text("enter at least 15 characters");
			}

			else if(parseInt($(this).val().replace(/ /g,'').length) < 15){

				//if it reached 15 char, submit button will be enabled
				$('#create_response_button').prop("disabled",true);		

				//update hint value
				$('#comment_text_hint').text(15 - parseInt($(this).val().replace(/ /g,'').length) + " more to go...");
			}
		}
	});

	
	// return hide link id
	function get_subcomment_text(str) {
		var last_char = "";
		for (var i = 0; i < str.length; i++) {
			if (str.substring(i, i+4) == "text") {
				last_char= i +4
			}
		}
		return str.substring(last_char);
	}


	//listen in subcomment_comment_text on change (dynamically generated)
	$(document).on('input', '.subcomment_comment_text', function(){

		//get the id value of the subcomment text: its id is same as the id value of create subcomment button
		create_sub_id = get_subcomment_text($(this).attr('id'));

		//disable the submit button on load
		$('#create_buttonx'+create_sub_id).prop("disabled",true);

		 //user required to input at least 15 char
		 //also detects if input is space. If input is space, dont include it.
		 if(parseInt($(this).val().replace(/ /g,'').length) > 14){

		 	$('#create_buttonx'+create_sub_id).prop("disabled",false);

			//remove hint
			$('#subcomment_text_hint'+create_sub_id).text("");
		}

		else if(parseInt($(this).val().replace(/ /g,'').length) == 0){

			//update hint value
			$('#subcomment_text_hint'+create_sub_id).text("enter at least 15 characters");
		}

		else if(parseInt($(this).val().replace(/ /g,'').length) < 15){

			//if it reached 15 char, submit button will be enabled
			$('#create_buttonx'+create_sub_id).prop("disabled",true);

			//update hint value
			$('#subcomment_text_hint'+create_sub_id).text(15 - parseInt($(this).val().replace(/ /g,'').length) + " more to go...");
		}
	});

	// if submit button is clicked, set it back to be disabled again. I need to handle it this way because its dynamically generated.
	$(document).on('click', '.create_buttonx', function(){
		$(this).prop("disabled",true);
	});

	//do not allow input of non-numeric char in response_negotiate_pay field
	$('#response_negotiate_pay').keypress(function (e) {
     	//if the letter is not digit then display error and don't type anything
     	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
     		return false;
     	}
     });

	//function to restrict user from inputting value less than the minimum value
	function restrict_less_than_min_val(){
		if(parseInt($('#response_negotiate_pay').val()) < parseInt($('#response_negotiate_pay').attr('min')) || $('#response_negotiate_pay').val() == ""){
			
			//update hint value
			$('#negotiation_pay_hint').text("only enter a value greater than or equals €" +$('#response_negotiate_pay').attr('min')).css('color', 'red');
			
			//disable submit response button
			$('#create_response_button').prop("disabled",true);
		}else{

			//disable submit response button
			$('#create_response_button').prop("disabled",false);

			//update hint value
			$('#negotiation_pay_hint').text("match the pay offer or demand a pay raise").css('color', 'gray');
		}

	}

	//when page loads
	restrict_less_than_min_val();

	//when input changes
	$('#response_negotiate_pay').on('input', function() {
		restrict_less_than_min_val();
	});


	$(".subcomment_link").each(function(){
		if($(this).text().charAt(0) == 0){
			$(this).hide();
		}
	});

});

