import Product from "./productModel.js";

import { ObjectId } from "mongodb";

import { getDb as db } from "../util/databaseConnector.js";

class Cart {
  static checkId(id) {
    if (!ObjectId.isValid(id)) {
      return false;
    }
    return new ObjectId(id);
  }

  static getCart(userId) {
    const checkedId = this.checkId(userId);
    if (!checkedId) {
      return Promise.reject(new Error("Invalid id"));
    }
    return db()
      .collection("users")
      .findOne({ _id: checkedId })
      .then((user) => {
        return user.cart;
      });
  }

  static addItem(userId, productId) {
    const checkedUserId = this.checkId(userId);
    const checkedProductId = this.checkId(productId);
    if (!checkedProductId || !checkedUserId) {
      return Promise.reject(new Error("Invalid id"));
    }
    return Product.getProduct(checkedProductId)
      .then((productData) => {
        return db()
          .collection("users")
          .findOne({ _id: checkedUserId, "cart.id": productId })
          .then((product) => {
            if (product) {
              return Cart.recountItem(userId, productId, 1);
            }
            return db()
              .collection("users")
              .updateOne(
                { _id: checkedUserId },
                {
                  $push: {
                    cart: {
                      id: productId,
                      title: productData.title,
                      price: productData.price,
                      count: 1,
                    },
                  },
                }
              );
          });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  static recountItem(userId, productId, count) {
    const checkedUserId = this.checkId(userId);
    const checkedProductId = this.checkId(productId);
    if (!checkedProductId || !checkedUserId) {
      return Promise.reject(new Error("Invalid id"));
    }
    return db()
      .collection("users")
      .updateOne(
        { _id: checkedUserId, "cart.id": productId },
        { $inc: { "cart.$.count": count } }
      );
  }

  static removeItem(userId, productId) {
    const checkedUserId = this.checkId(userId);
    const checkedProductId = this.checkId(productId);
    if (!checkedProductId || !checkedUserId) {
      return Promise.reject(new Error("Invalid id"));
    }
    return db()
      .collection("users")
      .updateOne(
        { _id: checkedUserId },
        { $pull: { cart: { id: productId } } }
      );
  }

  static clear(userId) {
    const checkedUserId = this.checkId(userId);
    if (!checkedUserId) {
      return Promise.reject(new Error("Invalid id"));
    }
    return db()
      .collection("users")
      .updateOne({ _id: checkedUserId }, { $set: { cart: [] } });
  }

  static getTotalPrice(userId) {
    const checkedUserId = this.checkId(userId);
    if (!checkedUserId) {
      return Promise.reject(new Error("Invalid id"));
    }
    return db()
      .collection("users")
      .findOne({ _id: checkedUserId })
      .then((user) => {
        return user.cart.reduce((a, e) => a + e.price * e.count, 0);
      });
  }

  static updateItem(userId, productId, productData) {
    const checkedUserId = this.checkId(userId);
    const checkedProductId = this.checkId(productId);
    if (!checkedProductId || !checkedUserId) {
      return Promise.reject(new Error("Invalid id"));
    }
    return db()
      .collection("users")
      .updateOne(
        { _id: checkedUserId, "cart.id": productId },
        { $set: { "cart.$": productData } }
      );
  }
}

export default Cart;
