var server=require("./connect-server");
var router=require("./router");
var requestHandlers = require("./requestHandlers")

var handle = {}
handle["/"] = requestHandlers.index;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
server.start(router.route, handle);