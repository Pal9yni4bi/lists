$(document).ready(function() {
var $success_box = $(".alert-success");
var $error_box = $(".alert-danger");
var $item_edit_button = "<div class=\"btn-group pull-right\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Change <span class=\"caret\"></span></button><ul class=\"dropdown-menu\"><li class=\"edit-text\"><a href=\"#\">Edit text</a></li><li class=\"mark-as-done\"><a href=\"#\">Mark as done</a></li><li class=\"mark-as-undone\"><a href=\"#\">Mark as undone</a></li><li role=\"separator\" class=\"divider\"></li><li class=\"delete\"><a href=\"#\">Delete</a></li></ul></div>";
$.getJSON('../data.json', function(data){
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
  $(".buttons-area").html($item_edit_button);
  make_change_button_alive();
  if ($("#new_list").hasClass("active") || $(".lists-names-group li").length === 1) {
	  	$(".list-control-buttons-group").addClass("hidden");
	}
}).success(function() {
	$success_box.html("Data has loaded successfull").slideToggle(500).fadeOut(3000);
}).error(function() {
	console.log( [ xhr.status, textStatus ] );
	$error_box.html("Data hadn't loaded successfull").slideToggle(500).fadeOut(3000);
});
$(".form-control").keydown(function(e) {
    if (e.which == '13') {
        console.log("Enter pressed");
		//userfriendly form function will be here
    }
});

$(".add-list-button").on("click", function(name) {
	list_adding($(this).parent().parent().children().val());
	save();
});
$(".add-button").on("click", item_adding);
$(".edit-list-name").on("click", list_name_edit);
$(".delete-list").on("click", list_delete);
$(".edit-text").on("click", edit_text);
$(".mark-as-done").on("click", mark_as_done);
$(".mark-as-undone").on("click", mark_as_undone);
$(".delete").on("click", delete_item);
$(".lists-names-group").on("click", return_list_control);
function list_adding(name) {
	var $id = $(".lists-names-group li").length - 1;
	if ($id == 0 && !$("#new_list").hasClass("active")) {
		$(".lists-names-group li").eq(-1).before("<li role=\"presentation\" class=\"active lists\"><a href=\"#list"+ $id +"\" aria-controls=\"messages\" role=\"tab\" data-toggle=\"tab\"><span class=\"lists-name\">"+ name +"</span> <span class=\"badge\"></span></a></li>");
		$(".tab-pane").eq(-1).before("<div role=\"tabpanel\" class=\"tab-pane active\" id=\"list"+$id+"\"><ul class=\"list-group\"></ul><div class=\"row\"><div class=\"col-lg-12\"><div class=\"input-group\"><input type=\"text\" class=\"form-control\" placeholder=\"List item adding\"><span class=\"input-group-btn\"><button class=\"btn btn-default add-button\" type=\"button\">Add</button></span></div></div></div></div>");
	} else {
		$(".lists-names-group li").eq(-1).before("<li role=\"presentation\" class=\"lists\"><a href=\"#list"+ $id +"\" aria-controls=\"messages\" role=\"tab\" data-toggle=\"tab\"><span class=\"lists-name\">"+ name +"</span> <span class=\"badge\"></span></a></li>");
		$(".tab-pane").eq(-1).before("<div role=\"tabpanel\" class=\"tab-pane\" id=\"list"+$id+"\"><ul class=\"list-group\"></ul><div class=\"row\"><div class=\"col-lg-12\"><div class=\"input-group\"><input type=\"text\" class=\"form-control\" placeholder=\"List item adding\"><span class=\"input-group-btn\"><button class=\"btn btn-default add-button\" type=\"button\">Add</button></span></div></div></div></div>");
	}
	$(".tab-pane").eq(-2).find(".add-button").on("click", item_adding);
	count_items_in_list($id);
}
function list_name_edit(){
	if ($("#new_list").hasClass("active") || $(".lists-names-group li").length === 1) {
		$error_box.html("Don't rename control tab!").slideToggle(500).fadeOut(3000);
		return;
	}
	$(".edit-list-name").addClass("disabled").unbind("click");
	var $current_tab = $(".lists-names-group .active .lists-name");
	var $current_name = $current_tab.text();
	$current_tab.html("<div class=\"input-group\"><input type =\"text\" class=\"form-control\" value=\"" + $current_name + "\"><span class=\"input-group-btn\"><button class=\"btn btn-default pull-right submit-button\" type=\"submit\">Submit</button></span></div>").find("button").on("click", function() {
		$current_tab.text($current_tab.find("input").val());
		$(".edit-list-name").removeClass("disabled").on("click", list_name_edit);
		save();
	});
}
function list_delete() {
	if ($("#new_list").hasClass("active") || $(".lists-names-group li").length === 1) {
		$error_box.html("Don't delete control tab!").slideToggle(500).fadeOut(3000);
		return;
	}
	var deleted_list = $(".tab-pane.active").detach();
	var deleted_list_name = $(".lists-names-group li.active").detach();
	$(".tab-pane").eq(0).addClass("active");
	$(".lists-names-group li").eq(0).addClass("active");
	if ($(".edit-list-name").hasClass("disabled")) {
		$(".edit-list-name").removeClass("disabled").on("click", list_name_edit);
	}
	save();
	//todo: add posibility of returning
  if ($("#new_list").hasClass("active") || $(".lists-names-group li").length === 1) {
	  	$(".list-control-buttons-group").addClass("hidden");
	}
}
function return_list_control() {
	var $list_cntrl_btns_gr = $(".list-control-buttons-group");
	if (!$("#new_list").parent().hasClass(".active")) {
		$list_cntrl_btns_gr.removeClass("hidden");
	}
}
function item_adding() {
	var $current_tab = $(this).parent().parent().parent().parent().parent();
	var $input = $current_tab.find("input").val();
	$current_tab.children("ul.list-group").append("<li class=\"list-group-item\"><div class=\"row\"><div class=\"col-xs-10 item-text\">" + $input +"</div><div class=\"col-xs-2 buttons-area\"></div></div></li>").find(".buttons-area").html($item_edit_button);
	make_change_button_alive();
	count_items_in_list($current_tab.index());
	save();
}
function edit_text() {
	var $current_item = $(this).parent().parent().parent().parent();
	var $edited_text = $current_item.children(".item-text").text();
	$current_item.html("<div class=\"input-group\"><input type=\"text\" class=\"form-control\" value=\""+$edited_text+"\"><span class=\"input-group-btn\"><button class=\"btn btn-default pull-right submit-button\" type=\"submit\">Submit</button></span></div>");
	$current_item.find("button").on("click", function() {
		$new_text = $(this).parent().parent().children("input").val();
		$(this).parent().parent().parent().html("<div class=\"col-xs-10 item-text\">"+$new_text+"</div><div class=\"col-xs-2 buttons-area\"></div>");
		$current_item.find(".buttons-area").html($item_edit_button);
		make_change_button_alive();//add context for exclude doubling?
		save();
	});
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
	var $deleted_item = $(this).parent().parent().parent().parent().parent();
	var $list_number = $deleted_item.parent().parent().index();
	$deleted_item.detach();
	count_items_in_list($list_number);
	//add possibility to return deleted item
	save();
}
function make_change_button_alive() {
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
	$(".submit-button").click();
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
			console.log( [ xhr.status, textStatus ] );
			$error_box.html("Data hadn't saved successfull").slideToggle(500).fadeOut(3000);
		},
		success: function() {
			$success_box.html("Data has saved successfull").slideToggle(500).fadeOut(3000);
		}
	});
}
});