import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".json": "application/json",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};
http
  .createServer(async (req, res) => {
    try {
      let file = path.resolve(
        root,
        "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
      );
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403).end();
        return;
      }
      if ((await stat(file)).isDirectory())
        file = path.join(file, "index.html");
      const { size } = await stat(file);
      const headers = {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Accept-Ranges": "bytes",
      };
      let start = 0,
        end = size - 1,
        status = 200;
      if (req.headers.range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (!match || (!match[1] && !match[2])) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
          return;
        }
        start = match[1]
          ? Number(match[1])
          : Math.max(0, size - Number(match[2]));
        end =
          match[1] && match[2]
            ? Math.min(Number(match[2]), size - 1)
            : size - 1;
        if (start > end || start >= size) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
          return;
        }
        status = 206;
        headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
      }
      res.writeHead(status, { ...headers, "Content-Length": end - start + 1 });
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      const stream = createReadStream(file, { start, end });
      stream.on("error", () => res.destroy());
      res.on("close", () => stream.destroy());
      stream.pipe(res);
    } catch {
      res
        .writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
        .end("Страница не найдена");
    }
  })
  .listen(3000, "127.0.0.1", () => console.log("Local: http://127.0.0.1:3000"));
