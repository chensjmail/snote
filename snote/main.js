global.$ = $;

var fs = require('fs');
var path = require('path');
var rootpath = 'E:/技术资料/snote';
var curNotebookPath = '';

$(document).ready(function() {
	fs.readdir(rootpath, function(error, files) {
		if (error) {
			console.log(error);
			window.alert(error);
			return;
		}

		for (var i = 0; i < files.length; ++i) {
			var file = files[i];
			var notebookPath =  rootpath+"/"+file;
			var li_notebook = $("<li></li>");
			var a_notebook = $("<a></a>").text(file).attr({
				"href" : "#",
				"style" : "padding: 7px 10px;",
				"onclick": "showNodes(this,'"+notebookPath+"')"
			});
			li_notebook.append(a_notebook);
			$("#notebooks").append(li_notebook);
		}
	});

});

function showNodes(a_notebook,path){
	curNotebookPath = path;
	$(a_notebook).parent().parent().children("li.open").removeClass("open");
	$(a_notebook).parent().addClass("open");
	fs.readdir(path, function(error, files) {
		if (error) {
			console.log(error);
			window.alert(error);
			return;
		}
		$("#notes").empty();
		for (var i = 0; i < files.length; ++i) {
			var file = files[i];
			var htmIndex = file.indexOf(".htm");
			if(htmIndex==-1)
				continue;
			var notePath =  path+"/"+file;
			var li_note = $("<li></li>");
			var a_note = $("<a></a>").text(file.substring(0,htmIndex)).attr({
				"href" : "#",
				"style" : "padding: 6px 8px;",
				"onclick": "showNode(this,'"+notePath+"')"
			});
			li_note.append(a_note);
			$("#notes").append(li_note);
		}
	});
}

function showNode(a_note,path){
	$(a_note).parent().parent().children("li.open").removeClass("open");
	$(a_note).parent().addClass("open");
	fs.readFile(path,function(error,data){
		if (error) {
			console.log(error);
			window.alert(error);
			return;
		}else{
			var titleStart = path.lastIndexOf("/");
			var titleEnd = path.lastIndexOf(".htm");
			var titleText = path.substring(titleStart+1,titleEnd);
			$("#noteTitle").val(titleText);
			var codeArea = document.getElementById("bgcode");
			e.doc.body.innerHTML = data;
			codeArea.value = data;
		}
	});
}


function newNote(){
	$("#noteTitle").val("");
	var codeArea = document.getElementById("bgcode");
	e.doc.body.innerHTML = "";
	codeArea.value = "";
}

function saveNote(){
	var fileName = $("#noteTitle").val();
	fileName+=".htm";
	var fileData = $("#bgcode").val();
	var filePath = curNotebookPath+"/"+fileName;
	fs.writeFile(filePath,fileData,function(error){
		if (error) {
			console.log(error);
			window.alert(error);
			return;
		}else{
			alert("保存成功");
		}
	});
}
