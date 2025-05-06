import Product from "./productModel.js";

import { readFile, writeFile } from "fs";

import path from "../util/pathResolver.js";

const dataPath = path("data", "cart.json");

class Cart {
  static fetchAll(callback) {
    readFile(dataPath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  static addItem(productId) {
    this.fetchAll((data) => {
      Product.findById(productId, (productData) => {
        let cartProducts = data;
        const crrProduct = cartProducts.findIndex(
          (product) => product.id == productId
        );

        if (crrProduct === -1) {
          cartProducts.push({
            id: productId,
            title: productData.title,
            price: productData.price,
            count: 1,
          });
        } else {
          cartProducts[crrProduct].count++;
        }
        writeFile(dataPath, JSON.stringify(cartProducts), (err) => {
          if (err) {
            console.error("Error writing file", err);
          }
        });
      });
    });
  }

  static decreaseItem(productId) {
    this.fetchAll((data) => {
      let cartProducts = data;
      const productIndex = cartProducts.findIndex(
        (product) => product.id == productId
      );
      const crrProduct = cartProducts[productIndex];
      if (crrProduct.count > 1) {
        crrProduct.count--;
        writeFile(dataPath, JSON.stringify(cartProducts), (err) => {
          if (err) {
            console.error("Error writing file", err);
          }
        });
      } else {
        this.removeItem(crrProduct.id);
      }
    });
  }

  static removeItem(productId) {
    this.fetchAll((data) => {
      let items = data;
      items = items.filter((item) => productId !== item.id);
      writeFile(dataPath, JSON.stringify(items), (err) => {
        if (err) {
          console.error("Error writing file", err);
        }
      });
    });
  }

  static clear() {
    writeFile(dataPath, JSON.stringify([]), (err) => {
      if (err) {
        console.error("Error writing file", err);
      }
    });
  }

  static getTotalPrice(cartItems) {
    const total = cartItems.reduce((a, e) => a + e.price * e.count, 0);
    return total;
  }
}

export default Cart;
