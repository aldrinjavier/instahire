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



jQuery.fn.submitSubcomment = function(){
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

	// listen to the clicked reply link, then store its subcomment form id on a cookie
	$(this).click(function(){
		subc_id = get_response_subcomment_form_id($(this).attr('id'));
		alert(subc_id);
		alert($(this).attr('id'));
		$.cookie("subcomment_form_id", subc_id);
	});
	return this;
}

$(function() {

	$('.subcomment_link').submitSubcomment();
});