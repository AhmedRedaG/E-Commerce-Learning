import { readFile, writeFile } from "fs";

import path from "../util/pathResolver.js";

const dataPath = path("data", "products.json");

class Product {
  constructor(id, title, description, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }

  save() {
    Product.fetchAll((data) => {
      let products = data;
      if (this.id) {
        products = products.map((product) => {
          if (this.id == product.id) return this;
          else return product;
        });
      } else {
        this.id = Date.now();
        products.push(this);
      }
      writeFile(dataPath, JSON.stringify(products), (err) => {
        if (err) {
          console.error("Error writing file", err);
        }
      });
    });
  }

  static deleteProduct(productId) {
    this.fetchAll((data) => {
      let products = data;
      products = products.filter((product) => productId !== product.id);

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
