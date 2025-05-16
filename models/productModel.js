import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = model("Product", productSchema);

// class Product {
//   static checkId(id) {
//     if (!ObjectId.isValid(id)) {
//       return false;
//     }
//     return new ObjectId(id);
//   }

//   static checkProduct(product) {
//     if (!product.title || !product.description || !product.price) {
//       return false;
//     }
//     return {
//       title: product.title,
//       description: product.description,
//       price: product.price,
//     };
//   }

//   static getAllProducts() {
//     return db().collection("products").find().toArray();
//   }

//   static getProduct(id) {
//     const checkedId = this.checkId(id);
//     if (!checkedId) {
//       return Promise.reject(new Error("Invalid id"));
//     }
//     return db().collection("products").findOne({ _id: checkedId });
//   }

//   static addProduct(product) {
//     const checkedProduct = this.checkProduct(product);
//     if (!checkedProduct) {
//       return Promise.reject(new Error("Invalid product"));
//     }
//     return db().collection("products").insertOne(checkedProduct);
//   }

//   static editProduct(id, product) {
//     const checkedId = this.checkId(id);
//     const checkedProduct = this.checkProduct(product);
//     if (!checkedProduct || !checkedId) {
//       return Promise.reject(
//         new Error("Invalid { !checkedId ? 'id' : 'product' }")
//       );
//     }
//     return db()
//       .collection("products")
//       .updateOne({ _id: checkedId }, { $set: checkedProduct });
//   }

//   static deleteProduct(id) {
//     const checkedId = this.checkId(id);
//     if (!checkedId) {
//       return Promise.reject(new Error("Invalid id"));
//     }
//     return db().collection("products").deleteOne({ _id: checkedId });
//   }
// }

export default model("Product", productSchema);
