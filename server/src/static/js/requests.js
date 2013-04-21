var docjsons = new Array();
var docurls = new Array();

var base_url = ".";

$(document).ready(function(){
	

	$("#api_load").on("click", function(event){
		var url = $('#docurl').val();
		var pattern = /(file|ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		if (pattern.test(url)) {
			if(docurls.indexOf(url) == -1){
				$.getJSON(base_url+'/parse?url=' + url, function(data) {
					docjsons.push(data);
					docurls.push(url);
					addSideBar("test",data,docurls.length - 1);
				});
			}
    	}
    	else alert("Url is invalid");
	});

});

function addSideBar (name,json,index) {
	var heading = $("<h3 id=" + index + ">").text(name)
    var div= $("<div style='padding:0px'>")
    for (var i = json.apis.length - 1; i >= 0; i--) {
    	var button = $("<button class='mybutton' id='apibtn" + i +"-" +index + "''>").text(json.apis[i].name);
    	button.draggable({cancel:false, 
    								revert:false, 
    								appendTo: "#editorcontainer", 
    								helper:'clone',
    								zIndex: 25,
    								scroll:false,
    								start:function(e,ui){$(ui.helper).addClass("ui-draggable-helper");} });
    	div.append(button);
    };
    $("#accordion").append(heading,div);
    $("#accordion").accordion("refresh");
}

function createWidgetContent(jsonindex,apiindex){
    var innerhtmlstring = "<p> " + docjsons[jsonindex].apis[apiindex].description + "</p></br><button> Edit arguments </button><select name = 'Method'>";
    for(var i=0;i<docjsons[jsonindex].apis[apiindex].methods.length;i++){
        innerhtmlstring+= "<option value= '" + docjsons[jsonindex].apis[apiindex].methods[i] + "'>" + docjsons[jsonindex].apis[apiindex].methods[i] + "</option>";
    }
    return innerhtmlstring; 
}
