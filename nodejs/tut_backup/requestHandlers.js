var exec = require("child_process").exec;
var util = require("util");
var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

function index(response, postData){
	var filename = "index.html";
	fs.readFile(filename, "binary", function(err, file) {
	      if(err) {        
	        response.writeHead(500, {"Content-Type": "text/plain"});
	        response.write(err + "\n");
	        response.end();
	        return;
	      }	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(file);
	response.end();
	});
}

function start(response, postData){
	console.log("Req Handler: Start called ");
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" '+
			'method="post">'+
		'<input type="file" name="upload">'+
		'<input type="submit" value="Upload file" />'+
		'</form>'+
		'</body>'+
		'</html>';
	//exec("ls -alh", function(error, stdout, stderr){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();
	
}

function upload(response, request){
	console.log("Req Handler: upload called ");
	var form = new formidable.IncomingForm(),
				files = [],
				fields = [],
				ff = [];
	form.uploadDir	= __dirname + '/public/uploads';

	form
	  .on('field', function(field, value) {
	    //console.log(field, value);
	    fields.push([field, value]);
	  })
	  .on('file', function(field, file) {
	    //console.log(field, file);
	    files.push([field, file]);
	    ff.push(file.path);
	  })
	  .on('end', function() {
	    console.log('-> upload done');
	    var tt = ff[0]+"test";
	    var cmd = __dirname + "/scripts/find_diff.sh " + ff[0] + " " + ff[1] + " " + tt;
	    console.log(cmd);
	    exec(cmd, function(error, stdout, stderr){
		var n = tt.lastIndexOf("/");
		console.log("Last index = " + n);
		var subs = tt.substring(n, tt.kength );
		console.log("subs " + subs);
		var loc = "/uploads" + subs;
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("<a href='../'>Back</a>");
		response.end("<img src='"+ loc + "'/>");
		});
	    //response.writeHead(200, {'content-type': 'text/plain'});
	    //response.write(cmd);
	    //response.end();
	  });

	  form.parse(request);

	/*form.parse(request, function(error, fields, files) {
		fs.rename(files.upload.path, "/tmp/test.png", function(err){
			if (err){
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path, "/tmp/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("Recv. image <br/>");
		response.write("<img src='/show' />");
		response.end();
	});
	*/
}

function show(response, postData) {
	console.log("Req handler: show called");
	fs.readFile("/tmp/test.png", "binary", function(error, file){
		if(error){
			response.writeHead(500, {
				"Content-Type" : "text/plain"
			});
			response.write(err + "\n");
			response.end();
		}
		else {
			response.writeHead(200, {
				"Content-Type" : "image/png"
			});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.index = index;