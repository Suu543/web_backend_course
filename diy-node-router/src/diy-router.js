// Test Case
// let route = new Route("/my/fance/route/page/:page");
// console.log(route.match("/my/fance/route/page/8"));

const http = require("http");
const Route = require("route-parser");
const fs = require("fs");
const path = require("path");

const router = (() => {
  let routes = [];

  const addRoute = (method, url, handler) => {
    routes.push({ method, url: new Route(url), handler });
  };

  const findRoute = (method, url) => {
    const route = routes.find((route) => {
      return route.method === method && route.url.match(url);
    });

    if (!route) return null;

    return { handler: route.handler, params: route.url.match(url) };
  };

  const get = (route, handler) => addRoute("get", route, handler);
  const post = (route, handler) => addRoute("post", route, handler);

  const router = () => {
    const listen = (port, cb) => {
      http
        .createServer((req, res) => {
          const mimeTypes = {
            ".html": "text/html",
            ".js": "text/javascript",
            ".css": "text/css",
            ".json": "application/json",
            ".png": "image/png",
            ".jpg": "image/jpg",
            ".gif": "image/gif",
            ".svg": "image/svg+xml",
            ".wav": "audio/wav",
            ".mp4": "video/mp4",
            ".woff": "application/font-woff",
            ".ttf": "application/font-ttf",
            ".eot": "application/vnd.ms-fontobject",
            ".otf": "application/font-otf",
            ".wasm": "application/wasm",
          };

          const filePath = "." + req.url;
          const extname = String(path.extname(filePath)).toLowerCase();
          const method = req.method.toLowerCase();
          const url = req.url.toLowerCase();
          const found = findRoute(method, url);

          if (found) {
            req.params = found.params;

            res.send = (content) => {
              res.writeHead(200, { "Content-Type": "text/html" });
              console.log(content);
              res.write(content);
              res.end();
            };

            return found.handler(req, res);
          } else {
            let contentType = mimeTypes[extname] || "application/octet-stream";

            fs.readFile(filePath, (error, content) => {
              if (error) {
                if (error.code == "ENOENT") {
                  fs.readFile("./404.html", (error, content) => {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.end(content, "utf-8");
                  });
                } else {
                  res.writeHead(500);
                  response.end(
                    "Sorry, check with the site admin for error: " +
                      error.code +
                      " ..\n"
                  );
                }
              } else {
                res.writeHead(200, { "Content-Type": contentType });
                res.end(content, "utf-8");
              }
            });
          }
        })
        .listen(port, cb);
    };

    return {
      get,
      post,
      listen,
    };
  };

  return router;
})();

module.exports = router;
