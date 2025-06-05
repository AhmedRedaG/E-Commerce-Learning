import { validationResult } from "express-validator";

import Product from "../models/productModel.js";
import User from "../models/userModel.js";

import { deleteImage } from "../util/fileHelper.js";

export const getProducts = (req, res, next) => {
  if (req.user) {
    if (req.user.role === "admin") {
      return res.redirect("/admin/products");
    }
  }

  const page = req.query.page || 0;
  const limit = 2;
  Product.find()
    .skip(page * limit)
    .limit(limit)
    .then((products) => {
      Product.countDocuments().then((totalCount) => {
        res.render("shop/products", {
          pageTitle: "All Products",
          currentPath: "/products",
          products,
          totalCount,
          page,
          limit,
        });
      });
    })
    .catch(next);
};

export const getAdminProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        currentPath: "/admin/products",
        products: products,
      });
    })
    .catch(next);
};

export const getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        currentPath: "/products",
        product: product,
      });
    })
    .catch(next);
};

export const getAddProduct = (req, res) => {
  const { title, price, description } = req.query;
  res.status(title ? 422 : 200).render("admin/manage-product", {
    pageTitle: "Add Product",
    currentPath: "/admin/add-product",
    edit: false,
    errorMessage: req.flash("error"),
    oldData: {
      title: title || "",
      price: price || "",
      description: description || "",
    },
  });
};

export const postAddProduct = (req, res, next) => {
  const productData = req.body;
  const imageData = req.file;

  if (imageData) {
    productData.imagePath = imageData.filename;
  } else {
    req.flash("error", "error in image field");
    return res.redirect(
      `/admin/add-product/?title=${productData.title}&price=${productData.price}&description=${productData.description}`
    );
  }

  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    req.flash("error", validationResults.array()[0].msg);
    return res.redirect(
      `/admin/add-product/?title=${productData.title}&price=${productData.price}&description=${productData.description}`
    );
  }

  const product = new Product(productData);
  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(next);
};

export const getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("admin/manage-product", {
        pageTitle: "Edit " + product.title,
        currentPath: "admin/add-product",
        product: product,
        edit: true,
        errorMessage: req.flash("error"),
      });
    })
    .catch(next);
};

export const postEditProduct = (req, res, next) => {
  const product = req.body;
  const productId = req.params.productId;
  const imageData = req.file;

  if (imageData) {
    deleteImage(req.body.oldImage);
    product.imagePath = imageData.filename;
  }

  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    req.flash("error", validationResults.array()[0].msg);
    return res.redirect(`/admin/edit-product/${productId}`);
  }

  Product.findByIdAndUpdate(productId, product)
    .then(() => {
      User.updateMany(
        { role: "user", "cart.id": productId },
        {
          $set: {
            "cart.$.title": product.title,
            "cart.$.price": product.price,
            "cart.$.imagePath": product.imagePath,
          },
        }
      ).then(() => {
        res.redirect("/admin/products");
      });
    })
    .catch(next);
};

export const postDeleteProduct = (req, res, next) => {
  const productId = req.body._id;
  Product.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return next(new Error("error in deleting product"));
      }
      deleteImage(deletedProduct.imagePath);
      User.updateMany(
        { role: "user", "cart.id": productId },
        {
          $pull: {
            cart: { id: productId },
          },
        }
      ).then(() => {
        res.redirect("/admin/products");
      });
    })
    .catch(next);
};
