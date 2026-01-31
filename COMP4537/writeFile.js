import fs from 'fs/promises';
import path from "path";
import url from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, "file.txt");


class WriteApp{

    async handleWrite(req, res){
          const parsedUrl = url.parse(req.url, true);
          const content = parsedUrl.query.text;
          if (!content) 
           {
               res.status(400).send('Missing text parameter');
               return;
           }

          try{
                    await fs.appendFile(FILE_PATH, content + '\n', 'utf8');
                    res.writeHead(200,{"Content-Type": "text/html"}); 
                    res.end ('Text appended successfully');
          }catch(err){
                    console.error('Error writing to file', err);
                    res.writeHead(500,{"Content-Type": "text/html"});
                    res.end('Error writing to file');
          }

    }

}

export default WriteApp;


