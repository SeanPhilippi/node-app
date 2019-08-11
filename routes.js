const filesys = require('fs');

const reqHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>Enter Message</title></head>');
    res.write(`
      <body>
        <form action="/message" method="POST">
          <input type="text" name="incoming-message" />
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
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // writeFile is preferrable as opposed to writeFileSync, so writing can be done asyncronously and not hold up the rest of the
      // program as it writes.  The methods within the callback are there because we only want them executing after the file is done
      // being written
      filesys.writeFile('secret-message.txt', message, (err) => {
        res.writeHead(302, { 'Location': '/' });
        // res.statusCode = 302;
        // res.setHeader('Content-Type', 'text/html')
        return res.end();
      });
    })
  }
  // allows ending of your running app once the req and logging of the req obj happens
  // normally you wouldn't want to quit your server, since people wouldn't be able to access your site anymore
  // process.exit();
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>')
  res.write('<h1>How\'s it going?</h1>');
  res.write('</html>');
  res.end();
};

module.exports = reqHandler;