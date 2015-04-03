// $(function() {

// 	// return subcomment form id
// 	function get_response_subcomment_form_id(str) {
// 		var last_char = "";
// 		for (var i = 0; i < str.length; i++) {
// 			if (str.charAt(i) == "t") {
// 				last_char= i +1
// 			}
// 		}
// 		return str.substring(last_char);
// 	}

// 	// listen to the clicked reply link, then store its subcomment form id on a cookie
// 	$("a.subcomment_link").click(function(){
// 		subc_id = get_response_subcomment_form_id($(this).attr('id'));
// 		alert(subc_id);
// 		alert($(this).attr('id'));
// 		$.cookie("subcomment_form_id", subc_id);
// 	});
// });



// jQuery.fn.submitSubcomment = function(){
// 	// return subcomment form id
// 	function get_response_subcomment_form_id(str) {
// 		var last_char = "";
// 		for (var i = 0; i < str.length; i++) {
// 			if (str.charAt(i) == "t") {
// 				last_char= i +1
// 			}
// 		}
// 		return str.substring(last_char);
// 	}

// 	// listen to the clicked reply link 
// 	// store its subcomment form id on a cookie to retrieve and use it in ajax js page
// 	$(this).click(function(){
// 		subc_id = get_response_subcomment_form_id($(this).attr('id'));
// 		// alert(subc_id);
// 		// alert($(this).attr('id'));
// 		$.cookie("subcomment_form_id", subc_id);
// 	});


// 	return this;
// }

// $(function() {

// 	$('.subcomment_link').submitSubcomment();
// });

$(function() {

	// return subcomment form id
	function get_response_subcomment_form_id(str) {
		var last_char = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) == "t") {
				last_char= i +1
			}
		}
		return str.substring(last_char);
	}

	function get_sub(str) {
		var last_char = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) == "x") {
				last_char= i +1
			}
		}
		return str.substring(last_char);
	}

	// listen to the clicked reply link 
	// the cookie will be retrieved in new ajax js page 
	// and will allow to show and hide the corect links and subcomment forms
	$('.subcomment_link').click(function(){
		var subc_id = get_response_subcomment_form_id($(this).attr('id'));
		$.cookie("subcomment_form_id", subc_id);
	});

	//it will ensure that the newly created subcomment be attached in the correct subcomment form
	//update the cookie when submit form is clicked, it will be retrieved in the create ajax js page
	$(document).on('click', '.create_buttonx', function(){
		var subc_id = get_sub($(this).attr('id'));
		$.cookie("subcomment_form_id", subc_id);
	});

});