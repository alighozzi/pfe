const fetch = require("node-fetch");
const cheerio = require("cheerio");
//const json2csv = require("json2csv");
//const fs = require("fs");
//const writeStream = fs.createWriteStream("LcWaikiki.csv");
//const url = "https://www.lcwaikiki.ma/list/?search_text=";

//writeStream.write(`titre,prix \n`);
searchItems = (searchTerm) => {
  return fetch(`https://www.lcwaikiki.ma/list/?search_text=${searchTerm}`)
    .then((response) => response.text())
    .then((body) => {
      const produits = [];
      const $ = cheerio.load(body);
      $(".product-item-wrapper ").each((i, element) => {
        const $element = $(element);
        const titre = $element
          .find("p.product-name a ")
          .text()
          .replace(/\s\s+/g, "");
        const prix = $element
          .find("div.product-price")
          .text()
          .replace(/\s\s+/g, "");
        const tailles = [];
        $element.find(".sizes ul li ").each((i, el) => {
          const taille = $(el).text();
          tailles.push(taille);
        });

        //const link = $('div.product-tile-inner a').attr('href')
        const image_src = $("a.product-item-image-link img").attr("src");
        const link1 = $("a.product-item-image-link").attr("href");
        const link = "https://www.lcwaikiki.ma" + link1;
        //writeStream.write(`${titre}, ${prix} \n`);
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
module.exports = { searchItems };
