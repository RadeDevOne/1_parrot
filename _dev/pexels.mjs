import fs from "fs";

import pexels from "pexels";

import faker from "faker";

import pns from "./mock_data/product_names.json";

// 5 * 160 (160 names) (160 requests) (5 products per request)

const numOfClusters = 8;
const numOfProductsPerCluster = 100;

console.log(pns);

/* const client = pexels.createClient(
  "563492ad6f917000010000019f6cd3c0598941b1a1cc2ce5fdf9b09a"
);

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
