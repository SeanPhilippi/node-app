const http = require('http');
const routes = require('./ex1-routes.js');
const server = http.createServer(routes);

server.listen(
  3005,
  () => console.log('listening on 3005, success :)')
);