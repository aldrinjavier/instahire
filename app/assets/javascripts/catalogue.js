$(document).ready(function() {
	$('a[href="/catalogues/search"], a[href="/catalogues"]').click(function(){
		$("form#task_search").submit();
	}); 
});