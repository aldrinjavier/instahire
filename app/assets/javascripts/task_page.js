$(function() {

/*****Question or negotiation*****/
	var is_collapse_form_active = false;
	$('#close-collapse').hide();

	$('#ask-question').click(function(){
		is_collapse_form_active = true;
		$(this).hide();
		$('#negotiate').hide();
		$('#close-collapse').show();
		$('#response_negotiate_pay').hide();
		$('#response_is_comment').val(1);
	});

	$('#negotiate').click(function(){
		is_collapse_form_active = true;
		$('#close-collapse').show();
		$(this).hide();
		$('#ask-question').hide();
		$('#response_negotiate_pay').show();
		$('#response_is_comment').val(0);
	});

	$('#close-collapse').click(function(){
		var is_collapse_form_active = false;
		$('#ask-question').show();
		$('#negotiate').show();
		$(this).hide();
	});

	// return hide link id
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


	$(".hide_subcomment_link").click(function(){
		subcomment_f_id = get_hide_response_subcomment_form_id($(this).attr('id'));
		// alert(subc_id);
		// alert($(this).attr('id'));
		// $.cookie("subcomment_form_id", subc_id);
		// alert($(this).attr('id'));
		$("#response-comment-section"+subcomment_f_id).hide();
		$("#hide_subcomment_formx"+subcomment_f_id).hide();
		$("#new_subcomment"+subcomment_f_id).show();
	});

});