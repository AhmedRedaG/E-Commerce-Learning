import { getDb as db } from "../util/databaseConnector.js";

import { ObjectId } from "mongodb";

class Product {
  static checkId(id) {
    if (!ObjectId.isValid(id)) {
      return false;
    }
    return new ObjectId(id);
  }

  static checkProduct(product) {
    if (!product.title || !product.description || !product.price) {
      return false;
    }
    return {
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  static fetchAll(callback) {
    db()
      .collection("products")
      .find()
      .toArray()
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        callback([]);
      });
  }

  static findById(id, callback) {
    const checkedId = this.checkId(id);
    if (!checkedId) {
      callback([]);
      return;
    }
    db()
      .collection("products")
      .findOne({ _id: checkedId })
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        callback([]);
      });
  }

  static addProduct(product) {
    const checkedProduct = this.checkProduct(product);
    if (!checkedProduct) {
      return;
    }

    db()
      .collection("products")
      .insertOne(checkedProduct)
      .catch((err) => {
        console.error("Error saving product", err);
      });
  }

  static editProduct(id, product) {
    const checkedId = this.checkId(id);
    const checkedProduct = this.checkProduct(product);
    if (!checkedProduct || !checkedId) {
      return;
    }
    db()
      .collection("products")
      .updateOne({ _id: checkedId }, { $set: checkedProduct })
      .catch((err) => {
        console.error("Error editing product", err);
      });
  }

  static deleteProduct(id) {
    const checkedId = this.checkId(id);
    if (!checkedId) {
      return;
    }
    db()
      .collection("products")
      .deleteOne({ _id: checkedId })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }
}

export default Product;
