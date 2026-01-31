import http from "http";
import url from "url";
import fs from "fs/promises";
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;
const FILE_PATH = path.join(__dirname, "../../file.txt");

http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/COMP4537/labs/3/writeFile/") {
    const text = parsedUrl.query.text;

    if (!text) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing text parameter");
      return;
    }

    // ⭐ 关键：appendFile 会「不存在就创建」
    await fs.appendFile(FILE_PATH, text + "\n");

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Text appended successfully");
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}).listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

