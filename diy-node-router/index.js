const router = require("./src/diy-router");
const fs = require("fs");
const app = router();
const port = 3000;

const HOMEPAGE_HTML = fs.readFileSync("index.html");

app.get("/", (req, res) => res.send(HOMEPAGE_HTML));
app.get("/test-route", (req, res) => res.send("Testing Tesing!"));
app.get("/user/:username", (req, res) => {
  const users = [
    { username: "johndoe", name: "John Doe" },
    { username: "janesmith", name: "Jane Smith" },
  ];

  const user = users.find((user) => user.username === req.params.username);

  res.send(`Hello ${user.name}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
