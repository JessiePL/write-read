import http from "http";
import fs from "fs/promises";
import path from "path";
import url from "url";

// 稳定 dirname（ESM）
const __dirname = new URL(".", import.meta.url).pathname;

// file.txt 固定位置
const BASE_DIR = path.join(__dirname, "../../");

http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // 👇 关键：用 startsWith
  if (parsedUrl.pathname.startsWith("/COMP4537/labs/3/readFile/")) {
    const fileName = parsedUrl.pathname.split("/").pop();
    const filePath = path.join(BASE_DIR, fileName);

    try {
      const content = await fs.readFile(filePath, "utf8");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(content);
    } catch (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`${fileName} not found`);
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}).listen(3000, () => {
  console.log("Read server running on http://localhost:3000");
});

