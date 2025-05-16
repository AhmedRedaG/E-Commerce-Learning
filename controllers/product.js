import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.render("shop/products", {
        pageTitle: "All Products",
        currentPath: "/products",
        products: products,
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const getAdminProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        currentPath: "/admin/products",
        products: products,
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const getProductById = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        currentPath: "/products",
        product: product,
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const getAddProduct = (req, res) => {
  res.render("admin/manage-product", {
    pageTitle: "Add Product",
    currentPath: "/admin/add-product",
    edit: false,
  });
};

export const postAddProduct = (req, res) => {
  const productData = req.body;
  const product = new Product(productData);
  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", error: err });
    });
};

export const getEditProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("admin/manage-product", {
        pageTitle: "Edit " + product.title,
        currentPath: "admin/add-product",
        product: product,
        edit: true,
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postEditProduct = (req, res) => {
  const product = req.body;
  const productId = req.params.productId;
  Product.findByIdAndUpdate(productId, product)
    .then(() => {
      req.user
        .updateItem(productId, product)
        .then(() => {
          res.redirect("/admin/products");
        })
        .catch((err) => {
          res.render("error", { pageTitle: "Error", currentPath: "", err });
        });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postDeleteProduct = (req, res) => {
  const productId = req.body._id;
  Product.findByIdAndDelete(productId)
    .then(() => {
      req.user
        .removeItem(productId)
        .then(() => {
          res.redirect("/admin/products");
        })
        .catch((err) => {
          res.render("error", { pageTitle: "Error", currentPath: "", err });
        });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};
