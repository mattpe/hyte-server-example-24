// Main JS file
import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // console.log('request obj:', req.url, req.headers, req.method);
  if (req.url === '/items' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end('[{ "id": 1, "name": "Item1" }, { "id": 2, "name": "Item2" }]');
    return;
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Welcome to my REST API!</h1>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
