const http = require('http'); // importing a core node module, Node ships with this
const routes = require('./routes');
// anon callback func given to createServer
// this is called whenever an incoming request is detected
// this request listener callback function will keep an event loop going listening for incoming
// requests at port 3003, once it gets a req (visiting that port), it will log the req object
// this event loop continues as long as event listeners are registered
const server = http.createServer(routes);

server.listen(3003, () => console.log('listening on 3003'));
