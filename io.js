const fs = require("fs");

fs.writeFileSync("sync.txt", "hello i my wirte file sync");

fs.writeFile("notsync.txt", "hello i my wirte file sync", () => {
  console.log("write file is ended");
});
