const fs = require("fs");

const http = require("http");

let users = [
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
        users.push({ ...JSON.parse(data), id: users.length + 1 });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ status: "success" }));
        return res.end();
      });
    } else if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      return res.end();
    } else if (req.method === "PUT") {
      ///////////// PUT //////////////////
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        data = JSON.parse(data);
        console.log(data);

        const foundUser = users.find(
          (user) => user.id === Number.parseInt(data.id)
        );

        if (foundUser) {
          foundUser.name = data.name;
          foundUser.email = data.email;
          foundUser.password = data.password;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ status: "success" }));
          return res.end();
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ status: "fail" }));
          return res.end();
        }
      });
    } else if (req.method === "DELETE") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        data = JSON.parse(data);
        users = users.filter((user) => user.id !== Number.parseInt(data.id));
        res.write(JSON.stringify({ status: "success" }));
        return res.end();
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ status: "nope I only accept GET & POST" }));
      return res.end();
    }
  } else {
    res.writeHead(404);
    return res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
