import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class ReadApp {
  async handleRead(req, res) {
    

    const fileName = req.query.file;
    const filePath = path.join(__dirname, fileName);
    if (!fileName) {
          res.status(400).send('Missing file parameter');
          return;
    }
    await fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file', err);
        res.status(500).send('Error reading file');
      } else {
        res.status(200).send(`File Content:\n${data}`);
      }
    });
  }
}

export default async function handler(req, res) {
  const app = new ReadApp();
  app.handleRead(req, res);
}
