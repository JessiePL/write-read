import fs from "fs/promises";
import path from "path";
import url from "url";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class ReadApp {
  async handleRead(req, res) {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const fileName = pathname.split("/").pop();
    const filePath = path.join(__dirname, fileName);
    console.log(filePath);

      if (!fileName) {
            res.writeHead(400, {"Content-Type": "text/html"});
            res.end('Missing file parameter');
            return;
      }
      try{
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(`File Content:<br>${data}`);
      }
      catch(err){
            console.error('Error reading file', err);
            res.writeHead(500, {"Content-Type": "text/html"});
            res.end('Error reading file');    
      }
  }
}

export default ReadApp;