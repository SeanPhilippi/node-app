const reqHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  let users = [
    // {
    //   username: 'Sean',
    //   id: 1
    // },
    // {
    //   username: 'Ken',
    //   id: 2
    // },
    // {
    //   username: 'Jess',
    //   id: 3
    // },
  ];

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
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
    `);
    return res.end();
  };

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
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
    `);
    return res.end();
  };

  if (url === '/create-user' && method === 'POST') {
    let id = 1;
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1].replace(/[+]/g, ' ');
      console.log('username from form req data', username);
      const newUser = {
        username: username,
        id: users[users.length - 1] ? users[users.length - 1].id : id
      };
      users.push(newUser);
      console.log(users)
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
};

module.exports = reqHandler;