const http = require('http'); // importing a core node module, Node ships with this
const filesys = require('fs');

// anon callback func given to createServer
// this is called whenever an incoming request is detected
// this request listener callback function will keep an event loop going listening for incoming
// requests at port 3003, once it gets a req (visiting that port), it will log the req object
// this event loop continues as long as event listeners are registered
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>Enter Message</title></head>');
    res.write(`
      <body>
        <form action="/message" method="POST">
          <input type="text" name="secret message" />
          <button type="submit">
            Send
          </button>
        </form>
      </body>
    `);
    res.write('</html>');
    // return so the callback function ends and doesn't try to call for methods off res after res.end() was already called
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (dataChunk) => {
      console.log('chunk', dataChunk);
      body.push(dataChunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      filesys.writeFileSync('secret-message.txt', message);
    })
    res.writeHead(302, { 'Location': '/' });
    // res.statusCode = 302;
    // res.setHeader('Content-Type', 'text/html')
    return res.end();
  }
  // allows ending of your running app once the req and logging of the req obj happens
  // normally you wouldn't want to quit your server, since people wouldn't be able to access your site anymore
  // process.exit();
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>')
  res.write('<h1>How\'s it going?</h1>');
  res.write('</html>');
  res.end();
});

server.listen(3003, () => console.log('listening on 3003'));
