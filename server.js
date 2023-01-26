const fs = require("fs");

const http = require("http");

const user = [
  { id: 1, name: "Win", email: "win@gmail.com", password: "hey" },
  { id: 2, name: "min", email: "min@gmail.com", password: "hey2" },
  { id: 3, name: "aung", email: "aung@gmail.com", password: "hey3" },
];

const server = http.createServer((req, res) => {
  let url = req.url;

  if (url === "/") {
    const data = fs.readFileSync("index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  } else if (url === "/script.js") {
    const data = fs.readFileSync("script.js");
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.write(data);
    return res.end();
  } else if (url === "/data") {
    let data = "";
    if (req.method === "POST") {
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        console.log(data);
        user.push({ ...JSON.parse(data), id: user.length + 1 });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ status: "success" }));
        return res.end();
      });
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(user));
      return res.end();
    }
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
