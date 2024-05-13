const fs = require("fs");
const http = require("http");
const url = require("url");

// // Read the name of the file from input.txt
// fs.readFile("./input.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);

//     fs.writeFile("./final.txt", `${data2}\n${data1}`, "utf-8", (err) => {
//       console.log("written");
//     });
//   });
// });

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf8"
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, "utf8");
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const dataobj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
  let output = temp.replace("{%PRODUCTNAME%}", product.productName);
  output = output.replace("{%IMAGE%}", product.image);
  output = output.replace("{%PRICE%}", product.price);
  output = output.replace("{%FROM%}", product.from);
  output = output.replace("{%NUTRIENTS%}", product.nutritents);
  output = output.replace("{%QUANTITY%}", product.quantity);
  output = output.replace("{%DESCRIPTION%}", product.description);
  output = output.replace("{%ID%}", product.id);

  if (!product.organic) output = output.replace(/{%NOT_}%/g, "not-organic");
  return output;
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname == "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardshtml = dataobj.map((el) => replaceTemplate(tempCard, el));
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardshtml);
    res.end(output);
  } else if (pathname == "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataobj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname == "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("Erro 404 problem");
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log("listening");
}); // explict local host
