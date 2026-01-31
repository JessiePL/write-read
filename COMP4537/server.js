import http from "http";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { URL } from "url";
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;
const filePath = path.join(__dirname, "file.txt");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // WRITE
  if (url.pathname === "/COMP4537/labs/3/writeFile/") {
    const text = url.searchParams.get("text");

    if (!text) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("Missing text");
    }

    await writeFile(filePath, text + "\n", { flag: "a" });

    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Written");
  }

  // READ
  if (url.pathname === "/COMP4537/labs/3/readFile/file.txt") {
    if (!existsSync(filePath)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("file.txt not found");
    }

    const data = await readFile(filePath, "utf-8");
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end(data);
  }

  res.writeHead(404);
  res.end("Not Found");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

