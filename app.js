const http = require('http'); // importing a core node module, Node ships with this

// anon callback func given to createServer
// this is called whenever an incoming request is detected
// this request listener callback function will keep an event loop going listening for incoming
// requests at port 3003, once it gets a req (visiting that port), it will log the req object
// this event loop continues as long as event listeners are registered
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // allows ending of your running app once the req and logging of the req obj happens
  // normally you wouldn't want to quit your server, since people wouldn't be able to access your site anymore
  // process.exit();
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>')
  res.write('<h1>How\'s it going?</h1>');
  res.write('</html>');
  res.end();
});

server.listen(3003);
