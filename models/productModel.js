import { readFile, writeFile } from "fs";

import path from "../util/pathResolver.js";

const dataPath = path("data", "products.json");

class Product {
  constructor(title, description, price) {
    this.title = title;
    this.description = description;
    this.price = price;
  }

  save() {
    Product.fetchAll((data) => {
      const products = data;
      products.push(this);
      writeFile(dataPath, JSON.stringify(products), (err) => {
        if (err) {
          console.error("Error writing file", err);
        }
      });
    });
  }

  static fetchAll(callback) {
    readFile(dataPath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return callback([]);
      }
      callback(JSON.parse(data));
    });
  }

  static findById(id, callback) {
    Product.fetchAll((products) => {
      const product = products.find((p) => p.id == id);
      if (product) {
        callback(product);
      } else {
        callback(null);
      }
    });
  }
}

export default Product;
