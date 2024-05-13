const fs = require("fs");

const textIN = fs.readFileSync("./input.txt", "utf8");

console.log(textIN);

const textOut =
  "hello world hello ajbbfaojf j bas: s{textIN}.\nCreated on s{Date.now()} ";
fs.writeFileSync("./input.txt", textOut);
console.log("done");

fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
  fs.readFile("./txt/${data}.txt", "utf-8", (err, data2) => {
    console.log(data2);
  });
});
