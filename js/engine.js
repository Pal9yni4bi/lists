$(".add-button").click( function() {
	var $current_tab = $(this).parent().parent().parent().parent().parent();
	var $input = $current_tab.children().children().children().children("input").val();
	// $current_tab.children("ul.list-group").children(".list-group-item").last().after("<li class=\"list-group-item\">" + $input +"</li>");
	$current_tab.children("ul.list-group").children(".list-group-item").last().after("<li class=\"list-group-item\"><div class=\"row\"><div class=\"col-xs-10\">" + $input +"</div><div class=\"col-xs-2\"><div class=\"btn-group pull-right\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Change <span class=\"caret\"></span></button><ul class=\"dropdown-menu\"><li class=\"mark-as-done\"><a href=\"#\">Mark as done</a></li><li class=\"mark-as-undone hidden\"><a href=\"#\">Mark as undone</a></li><li role=\"separator\" class=\"divider\"></li><li class=\"delete\"><a href=\"#\">Delete</a></li></ul></div></div></div></li>");
	$(".mark-as-done").bind("click", mark_as_done);
	$(".mark-as-undone").bind("click", mark_as_undone);
	$(".delete").bind("click", delete_item);
});
$(".mark-as-done").click(mark_as_done);
$(".mark-as-undone").click(mark_as_undone);
$(".delete").click(delete_item);
function mark_as_done() {
	$(this).parent().parent().parent().parent().parent().addClass("list-group-item-success");
	$(this).parent().children("li.mark-as-undone").removeClass("hidden");
	$(this).parent().children("li.mark-as-done").addClass("hidden");
}
function mark_as_undone() {
	$(this).parent().parent().parent().parent().parent().removeClass("list-group-item-success");
	$(this).parent().children("li.mark-as-done").removeClass("hidden");
	$(this).parent().children("li.mark-as-undone").addClass("hidden");
}
function delete_item() {
	var $deleted_item = $(this).parent().parent().parent().parent().parent().detach();
	//add possibility to return deleted item
}