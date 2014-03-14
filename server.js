var app = require('http').createServer(handler), fs = require('fs');
 
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
tconsole.log("Listening on " + port);
});
 
 
function handler(req, res) {
	console.log(req['url']);
	fs.readFile(__dirname + req['url'], function(err, data) {
		console.log(__dirname + req['url']);
		console.log(err);
		if (err) {
			res.writeHead(200);
			res.end("File not found!");
			return;
		}
		res.writeHead(200);
		res.end(data);
	});
}
