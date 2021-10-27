import fs from "fs";
import "dotenv/config.js";
import { createApi } from "unsplash-js";
import pexels from "pexels";

// import faker from "faker";

// import { product_names } from "./mock_data/product_names.mjs";

// 5 * 160 (160 names) (160 requests) (5 products per request)

import nodeFetch from "node-fetch";
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_KEY,
  fetch: nodeFetch,
});

const pex = pexels.createClient(process.env.PEXELS_KEY);

const getProdNames = () => {
  const prz = fs.readFileSync("_dev/mock_data/pn.json", { encoding: "utf-8" });

  return JSON.parse(prz);
};

console.log(getProdNames());
console.log(process.env.UNSPLASH_KEY);

const generatePexelImagesForProducts = async () => {
  for (let i = 0; i < 40; i++) {
    // console.log(product);
    /* 
    const images = await pex.photos.search({
      query: product_names[i].product,
      page: 1,
      per_page: 5,
    }); */

    const result = await unsplash.search.getPhotos({
      query: product_names[i].product,
      page: 1,
      perPage: 20,
      orientation: "landscape",
    });

    const images = result.response;

    console.log({ images });

    product_names[i].images = images;
  }

  // console.log({ product_names });

  fs.writeFileSync(
    "_dev/output/prods_and_imgs.json",
    JSON.stringify(product_names),
    {
      encoding: "utf8",
    }
  );
};

// console.log("blah");

// generatePexelImagesForProducts();

/* const client = pexels.createClient(
  "563492ad6f917000010000019f6cd3c0598941b1a1cc2ce5fdf9b09a"
);


/*
client.photos
  .search({
    query: "Coffee Guatemala Dark" + " product",
    page: 2,
    per_page: 12,
  })
  .then((res) => {
    console.log(res.photos[0].src);
  });
 */

// console.log({ product_names });

/* fs.writeFileSync("_dev/output/prods_and_imgs.json", JSON.stringify(product_names), {
  encoding: "utf8",
}); */
