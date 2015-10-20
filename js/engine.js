$(".add-button").click( function() {
	var $current_tab = $(this).parent().parent().parent().parent().parent();
	var $input = $current_tab.children().children().children().children("input").val();
	// $(".list-group").last(".list-group-item").after("<li class=\"list-group-item1233\">added</li>");
	$current_tab.children("ul.list-group").children(".list-group-item").last().after("<li class=\"list-group-item\">" + $input +"</li>");
	// $(".list-group").after("<li class=\"list-group-item1233\">added</li>"); works well
	// $(".list-group").last(".list-group-item").after("added").wrap("<li class=\"list-group-item\"></li>");
}
);