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
        const crrProduct = cartProducts.findIndex((p) => p.id == productId);

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
        this.rewriteCart(cartProducts);
      });
    });
  }

  static decreaseItem(productId) {
    this.fetchAll((data) => {
      let cartProducts = data;
      const productIndex = cartProducts.findIndex((p) => p.id == productId);
      const crrProduct = cartProducts[productIndex];
      if (crrProduct.count > 1) {
        crrProduct.count--;
        this.rewriteCart(cartProducts);
      } else {
        this.removeItem(crrProduct.id);
      }
    });
  }

  static removeItem(productId) {
    this.fetchAll((data) => {
      let items = data;
      items = items.filter((item) => productId !== item.id);
      this.rewriteCart(items);
    });
  }

  static clear() {
    this.rewriteCart([]);
  }

  static getTotalPrice(cartItems) {
    const total = cartItems.reduce((a, e) => a + e.price * e.count, 0);
    return total;
  }

  static updateItem(id, title, price) {
    if (id) {
      this.fetchAll((data) => {
        const items = data;
        items.forEach((item, index) => {
          if (id == item.id) {
            items[index].title = title;
            items[index].price = price;
          }
        });
        this.rewriteCart(items);
      });
    }
  }

  static rewriteCart(data) {
    writeFile(dataPath, JSON.stringify(data), (err) => {
      if (err) {
        console.error("Error writing file", err);
      }
    });
  }
}

export default Cart;
