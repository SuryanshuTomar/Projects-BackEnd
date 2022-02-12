// imports
const http = require("http");
const url = require("url");
const { readFileSync, writeFileSync } = require("fs");
const replaceTemplate = require("./modules/replaceTemplate");

// HTML Templates
const tempOverview = readFileSync(
    `${__dirname}/templates/template-overview.html`,
    "utf-8"
);
const tempCard = readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
);
const tempProduct = readFileSync(
    `${__dirname}/templates/template-product.html`,
    "utf-8"
);

// JSON Data
const data = readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// SERVER
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // Overview Page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, { "content-type": "text/html" });

        const cardsHTML = dataObj
            .map((productObj) => replaceTemplate(tempCard, productObj))
            .join("");
        const overviewOutput = tempOverview.replace(
            /{%PRODUCT_CARDS%}/g,
            cardsHTML
        );
        res.end(overviewOutput);

        // Product Page
    } else if (pathname === "/product") {
        res.writeHead(200, { "content-type": "text/html" });
        const product = dataObj[query.id];
        const productOutput = replaceTemplate(tempProduct, product);
        res.end(productOutput);

        // API
    } else if (pathname === "/api") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(data);

        // Not Found Page
    } else {
        res.writeHead(404, {
            "content-type": "text/html",
            "my-own-header": "Hello, world!",
        });
        res.end("<h1>Can not find page</h1>");
    }
});

server.listen("8000", "localhost", () => {
    console.log("Listening on server port 8000");
});
