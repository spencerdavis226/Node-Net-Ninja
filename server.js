const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((request, response) => {
  // Lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('hello');
  });

  greet();
  greet();

  // Set header content type
  response.setHeader('Content-Type', 'text/html');

  let path = './views/';
  switch (request.url) {
    case '/':
      path += 'index.html';
      response.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      response.statusCode = 200;
      break;
    case '/about-me':
      response.statusCode = 301; // Permanent redirect code
      response.setHeader('Location', '/about');
      response.end();
      break;
    default:
      path += '404.html';
      response.statusCode = 404;
      break;
  }

  // Send an HTML file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      response.end();
    } else {
      // response.write(data);
      response.end(data);
    }
  });
});

// Port 3000 is typical for local web development
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});
