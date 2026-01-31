import WriteApp from './writeFile.js';
import ReadApp from './readFile.js';
import http from 'http';
import url from 'url';
import path from 'path';

const PORT = 3000;

class Server {
  constructor() {
    this.writeApp = new WriteApp();
    this.readApp = new ReadApp();
    this.server = http.createServer(this.requestListener.bind(this));
  }

  async requestListener(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    console.log(pathname);
    if (pathname.includes('/COMP4537/labs/3/writeFile/')) {
      await this.writeApp.handleWrite(req, res);
    } else if (pathname.includes('/COMP4537/labs/3/readFile/')) {
      console.log("readFile request received");
      await this.readApp.handleRead(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("Not Found");
    }
  }

  start() {
    this.server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

const server = new Server();
server.start();   
