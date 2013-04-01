connect = require("connect");
var url = require("url");


function start(route, handle){
	var app = connect()
		.use(connect.logger("dev"))
		.use(connect.static(__dirname + '/public'))
		.use(function(request, response){
			var pathname = url.parse(request.url).pathname;
			var postData = "";
			console.log("request received for " + pathname);
			route(handle, pathname, response, request);
		})
		.listen(8888);
}

exports.start = start;