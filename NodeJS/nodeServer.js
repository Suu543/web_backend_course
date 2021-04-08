const http = require("http"); // http is native to Node.js wej ust have to ask for it...
const fs = require("fs"); // gives node access This computer file system

// The http module has a createServer method
// Takes 1 args
// - Callback,
//  - Callback has 2 args: req, res
const server = http.createServer((req, res) => {
  //   console.log("Request", req);
  console.log(`A request was made to: ${req.url}`);

  if (req.url === "/") {
    // HTTP Message
    // 1. start-line - check
    // 2. Header
    // 3. Body
    // -----------------------------
    // writeHead takes 2 args:
    // 1. status code
    // 2. object for the mime-type
    res.writeHead(200, { "content-type": "text/html" });
    const homePageHTML = fs.readFileSync("node.html");
    res.write(homePageHTML);
    res.end();
  } else if (req.url === "/node.png") {
    res.writeHead(200, { "content-type": "image/png" });
    const image = fs.readFileSync("node.png");
    res.write(image);
    res.end();
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    const css = fs.readFileSync("styles.css");
    res.write(css);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h4>Sorry, this isn't the page you're looking for!</h4>`);
    res.end();
  }
});

// createServer returns an object with listen method
// listen takes 1 args
// - port to listen for http traffic on
server.listen(3000);
