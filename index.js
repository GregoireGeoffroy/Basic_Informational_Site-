var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;

  // If the request is to the root, serve index.html
  if (filename === './') {
    filename = './index.html';
  } else {
    // Append .html to the path if not provided
    filename += filename.endsWith('.html') ? '' : '.html';
  }

  fs.readFile(filename, function(err, data) {
    if (err) {
      // If the file is not found, serve the custom 404 page
      fs.readFile('./404.html', function(error404, data404) {
        if (error404) {
          // If 404.html also doesn't exist, return a plain text 404 message
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        } else {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.write(data404);
          return res.end();
        }
      });
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
