var http = require('http');
var fs = require('fs');
var mime = require('mime').types;

function return404(response) {
  fs.readFile('404.html', function (err, data) {
    response.statusCode = 404;
    response.setHeader('content-type', 'text/html');
    if (!err) response.write(data, 'utf8');
    response.end();
  });
}

console.log('Starting server\n');
http.createServer(function(req, res) {
  console.log(req.url);
  var filename = './files' + req.url;
  if (filename.indexOf('..') > -1) return404(res);
  else if (filename.lastIndexOf('.') == 0) {
    if (filename[filename.length - 1] == '/') {
      var tryfile = false;
      filename += 'index.html';
    }
    else {
      filename += '/index.html';
      var tryfile = true;
    }
    fs.readFile(filename, function(err, data) {
      if (err) {
        if (tryfile) {
          filename = filename.substr(0, filename.length - 11) + '.html';
          fs.readFile(filename, function(err, data) {
            if (err) return404(res);
            else {
              var extension = filename.substr(filename.lastIndexOf('.') + 1, filename.length);
              res.setHeader('content-type', mime[extension]);
              res.end(data);
            }
          });
        }
        else return404(res);
      }
      else {
        var extension = filename.substr(filename.lastIndexOf('.') + 1, filename.length);
        res.setHeader('content-type', mime[extension]);
        res.end(data);
      }
    });
  }
  else {
    fs.readFile(filename, function(err, data) {
      if (err) return404(res);
      else {
        var extension = filename.substr(filename.lastIndexOf('.') + 1, filename.length);
        res.setHeader('content-type', mime[extension]);
        res.end(data);
      }
    });
  }
}).listen(80);