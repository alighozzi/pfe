const fetch = require("node-fetch");
const cheerio = require("cheerio");
// const fs = require("fs");
// const writeStream = fs.createWriteStream("Etam.csv");

//writeStream.write(`titre,prix \n`);
searchEtam = (searchItem) => {
  return fetch(`https://www.etam.ma/recherche?q=${searchItem}`)
    .then((response) => response.text())
    .then((body) => {
      const produits = [];
      const $ = cheerio.load(body);
      $(".search-result__item").each((i, element) => {
        const $element = $(element);
        const titre = $element
          .find("h3.product-name-title")
          .text()
          .replace(/\s\s+/g, "");
        const prix = $element
          .find("div span.price")
          .text()
          .replace(/\s\s+/g, "");
        const link =
          "https://www.etam.ma" +
          $element.find("div.search-result__image a").attr("href");
        const image_src = $element.find("div.face-a img").attr("data-src");
        //writeStream.write(`${titre} ${prix} \n`);
        const produit = {
          image_src,
          titre,
          prix,
          link,
        };
        produits.push(produit);
      });
      return produits;
    });
};
module.exports = { searchEtam };
