import Product from "./productModel.js";

import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      count: { type: Number, required: true },
    },
  ],
});

userSchema.methods.getCart = function () {
  return this.cart;
};

userSchema.methods.addItem = function (productId) {
  return Product.findById(productId)
    .then((productData) => {
      const productIndex = this.cart.findIndex((e) => e.id === productId);
      if (productIndex === -1) {
        this.cart.push({
          id: productId,
          title: productData.title,
          price: productData.price,
          count: 1,
        });
      } else {
        this.cart[productIndex].count++;
      }
      return this.save();
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

userSchema.methods.recountItem = function (productId, count) {
  const productIndex = this.cart.findIndex((e) => e.id === productId);
  if (this.cart[productIndex].count + count <= 0) {
    return this.removeItem(productId);
  }
  this.cart[productIndex].count += count;
  return this.save();
};

userSchema.methods.removeItem = function (productId) {
  const productIndex = this.cart.findIndex((e) => e.id === productId);
  this.cart.splice(productIndex, 1);
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = [];
  return this.save();
};

userSchema.methods.getTotalPrice = function () {
  return this.cart.reduce((a, e) => a + e.price * e.count, 0);
};

userSchema.methods.updateItem = function (productId, productData) {
  const productIndex = this.cart.findIndex((e) => e.id === productId);
  this.cart[productIndex].title = productData.title;
  this.cart[productIndex].price = productData.price;
  return this.save();
};

const User = model("User", userSchema);

export default User;
