const reqHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
          <title>Greeting</title>
        </head>
        <body>
          <div>
            <p>
              Welcome!
            </p>
            <p>
              Check out my form below!
            </p>
            <form action="/create-user" method="POST">
              <label htmlFor="create-user">Enter Username:</label><br>
              <input type="text" name="create-user"/>
              <button type-"submit>
                Submit
              </button>
            </form>
          </div>
        </body>
      </html>
    `)
  };

  if (url === '/users') {
    const users = [
      {
        username: 'Sean',
        id: 1
      },
      {
        username: 'Ken',
        id: 2
      },
      {
        username: 'Jess',
        id: 3
      },
    ];

    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
          <title>Document</title>
        </head>
        <body>
          <ul style="list-style: none;">
            ${
              users.map(user => {
                return (`
                  <li
                    style="border: 1px blue solid; margin-bottom: .2rem; width: 8rem;";
                  >
                    name: ${user.username}<br>
                    id: ${user.id}
                  </li>
                `)
              }).join('')
            }
          </ul>
        </body>
      </html>
    `)
  };

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const logMessage = parsedBody.split('=')[1];
      console.log('username from form req data', logMessage);
    });
  }
};

module.exports = reqHandler;