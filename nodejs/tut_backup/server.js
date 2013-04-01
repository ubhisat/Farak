var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		var postData = "";
		console.log("request received for " + pathname);
		//request.setEncoding("utf-8");
		route(handle, pathname, response, request);
		/*
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received POST data" + postDataChunk)
		})


		request.addListener("end", function(){
			route(handle, pathname, response, postData)
		})
		*/
		/*
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.write("Hello World!");
		response.end();
		*/
	}
	http.createServer(onRequest).listen(8888);
	console.log("server started");
}

exports.start = start;