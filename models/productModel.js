import { getDb as db } from "../util/databaseConnector.js";

import { ObjectId } from "mongodb";

class Product {
  static addProduct(product) {
    db()
      .collection("products")
      .insertOne(product)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error saving product", err);
      });
  }

  static editProduct(id, product) {
    db()
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: product })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error editing product", err);
      });
  }

  static deleteProduct(id) {
    db()
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }

  static fetchAll(callback) {
    db()
      .collection("products")
      .find()
      .toArray()
      .then((data) => {
        console.log(data);
        callback(data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        callback([]);
      });
  }

  static findById(id, callback) {
    db()
      .collection("products")
      .findOne({ _id: new ObjectId(id) })
      .then((data) => {
        console.log(data);
        callback(data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        callback([]);
      });
  }
}

export default Product;
