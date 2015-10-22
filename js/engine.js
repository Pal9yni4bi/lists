$(document).ready(function() {
var $success_box = $(".alert-success");
var $error_box = $(".alert-danger");

$.getJSON('../data.json', function(data){
  var items = []; 
  var i = 0;
  $.each(data, function(key, val){
	  list_adding(key);	  
	  $(val).each(function(k, v){
		if (v[1] == 1) { 
			$(".tab-pane").eq(i).find(".list-group").append("<li class=\"list-group-item list-group-item-success\"><div class=\"row\"><div class=\"col-xs-10 item-text\">"+v[0]+"</div><div class=\"col-xs-2 buttons-area\"></div></div></li>"); 
			} else { 
			$(".tab-pane").eq(i).find(".list-group").append("<li class=\"list-group-item\"><div class=\"row\"><div class=\"col-xs-10 item-text\">"+v[0]+"</div><div class=\"col-xs-2 buttons-area\"></div></div></li>");
			};
	  });
	count_items_in_list(i);
	i++
  });
make_change_button_alive();
}).success(function() {
	$success_box.html("Data has loaded successfull");
	$success_box.slideToggle(500);
	$success_box.fadeOut(3000);
}).error(function() {
	$error_box.html("Data hadn't loaded successfull");
	$success_box.slideToggle(500);
	$(".alert-success").fadeOut(3000);	
});
$(".add-list-button").click(function(name) {
	list_adding($(this).parent().parent().children().val());
	save();
});
$(".add-button").click(item_adding);
$(".delete-list").click(list_delete);
$(".edit-text").click(edit_text);
$(".mark-as-done").click(mark_as_done);
$(".mark-as-undone").click(mark_as_undone);
$(".delete").click(delete_item);
function list_adding(name) {
	var $id = $(".lists-names-group li").length - 1;
	$(".lists-names-group li").eq(-1).before("<li role=\"presentation\"><a href=\"#list"+ $id +"\" aria-controls=\"messages\" role=\"tab\" data-toggle=\"tab\"><span class=\"lists-name\">"+ name +"</span> <span class=\"badge\"></span></a></li>");
	if ($id == 0) {
		$(".tab-pane").eq(-1).before("<div role=\"tabpanel\" class=\"tab-pane active\" id=\"list"+$id+"\"><ul class=\"list-group\"></ul><div class=\"row\"><div class=\"col-lg-12\"><div class=\"input-group\"><input type=\"text\" class=\"form-control\" placeholder=\"List item adding\"><span class=\"input-group-btn\"><button class=\"btn btn-default add-button\" type=\"button\">Add</button></span></div><!-- /input-group --></div><!-- /.col-lg-12 --></div><!-- /.row --></div>");
	} else {
		$(".tab-pane").eq(-1).before("<div role=\"tabpanel\" class=\"tab-pane\" id=\"list"+$id+"\"><ul class=\"list-group\"></ul><div class=\"row\"><div class=\"col-lg-12\"><div class=\"input-group\"><input type=\"text\" class=\"form-control\" placeholder=\"List item adding\"><span class=\"input-group-btn\"><button class=\"btn btn-default add-button\" type=\"button\">Add</button></span></div><!-- /input-group --></div><!-- /.col-lg-12 --></div><!-- /.row --></div>");
	}	
	$(".tab-pane").eq(-2).find(".add-button").on("click", item_adding);
	count_items_in_list($id);
}
function list_name_edit(){
	//
}
function list_delete() {
	var deleted_list = $(".tab-pane.active").detach();
	var deleted_list_name = $(".lists-names-group li.active").detach();
	save();
	//todo: fix choosing active list after deleting
	//todo: fix deleting after loading without choosed name of list
	//todo: add posibility of returning
}
function item_adding() {
	var $current_tab = $(this).parent().parent().parent().parent().parent();
	var $input = $current_tab.find("input").val();
	$current_tab.children("ul.list-group").append("<li class=\"list-group-item\"><div class=\"row\"><div class=\"col-xs-10 item-text\">" + $input +"</div><div class=\"col-xs-2 buttons-area\"></div></div></li>");
	make_change_button_alive();
	count_items_in_list($current_tab.index());
	save();
}
function edit_text() {
	var $current_item = $(this).parent().parent().parent().parent().children(".item-text");
	var $edited_text = $current_item.text();
	$current_item.html("<input type=\"text\" class=\"form-control\" value=\""+$edited_text+"\">");
	$current_item.parent().children(".buttons-area").html("<button class=\"btn btn-default pull-right\" type=\"submit\">Submit</button>");
	$current_item.parent().children(".buttons-area").children().click(save_text);
}
function save_text() {
	$new_text = $(this).parent().parent().children(".item-text").children("input").val();
	$(this).parent().parent().children(".item-text").text($new_text);
	$(this).parent().parent().children(".buttons-area").html("<div class=\"btn-group pull-right\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Change <span class=\"caret\"></span></button><ul class=\"dropdown-menu\"><li class=\"edit-text\"><a href=\"#\">Edit text</a></li><li class=\"mark-as-done\"><a href=\"#\">Mark as done</a></li><li class=\"mark-as-undone\"><a href=\"#\">Mark as undone</a></li><li role=\"separator\" class=\"divider\"></li><li class=\"delete\"><a href=\"#\">Delete</a></li></ul></div>");
	make_change_button_alive();//add context for exclude doubling?
	save();
}
function mark_as_done() {
	$(this).parent().parent().parent().parent().parent().addClass("list-group-item-success");
	save();
}
function mark_as_undone() {
	$(this).parent().parent().parent().parent().parent().removeClass("list-group-item-success");
	save();
}
function delete_item() {
	var $deleted_item = $(this).parent().parent().parent().parent().parent().detach();
	//add possibility to return deleted item
	save();
}
function make_change_button_alive() {
	$(".buttons-area").html("<div class=\"btn-group pull-right\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Change <span class=\"caret\"></span></button><ul class=\"dropdown-menu\"><li class=\"edit-text\"><a href=\"#\">Edit text</a></li><li class=\"mark-as-done\"><a href=\"#\">Mark as done</a></li><li class=\"mark-as-undone\"><a href=\"#\">Mark as undone</a></li><li role=\"separator\" class=\"divider\"></li><li class=\"delete\"><a href=\"#\">Delete</a></li></ul></div>");
	$(".edit-text").on("click", edit_text);
	$(".mark-as-done").on("click", mark_as_done);
	$(".mark-as-undone").on("click", mark_as_undone);
	$(".delete").on("click", delete_item);
}
function count_items_in_list(i) {
	var number_of_items = $(".list-group").eq(i).find(".item-text").length;
	$(".lists-name").eq(i).parent().find(".badge").html(number_of_items);
}
function save() {
var lists = {};
$(".lists-names-group .lists-name").each(function(indx,elem) {
	lists[$(elem).text()] = [];
	var $current_list = lists[$(elem).text()];
	$(".tab-pane").eq(indx).find(".item-text").each(function(i, e) {
		lists[$(elem).text()][i] = [];
		lists[$(elem).text()][i][0] = $(e).html(); //write text of list item to memory
		lists[$(elem).text()][i][1] = "0"; //write 0-parameter (=undone) by default
		if ($(e).parent().parent().hasClass("list-group-item-success")) {
			lists[$(elem).text()][i][1] = "1"; //write 1-parameter (=done), if item marked as done
		}
	});
});
var data=JSON.stringify(lists);
$.ajax({
		type: 'POST',
		url: "engine.php",
		cache: false,
		data: "data="+data,
		error: function( xhr, textStatus ) {
			$error_box.html("Data hadn't saved successfull");
			$success_box.slideToggle(500);
			$(".alert-success").fadeOut(3000);	
			console.log( [ xhr.status, textStatus ] );
		},
		success: function() {
			$success_box.html("Data has saved successfull");
			$success_box.slideToggle(500);
			$success_box.fadeOut(3000);
		}
	});
}
});