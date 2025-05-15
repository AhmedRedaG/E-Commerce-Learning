import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";

export const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/products", {
      pageTitle: "All Products",
      currentPath: "/products",
      products: products,
    });
  });
};

export const getAdminProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      currentPath: "/admin/products",
      products: products,
    });
  });
};

export const getProductById = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      currentPath: "/products",
      product: product,
    });
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
  const product = req.body;
  Product.addProduct(product)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", error: err });
    });
  // Cart.updateItem(id, title, price);
};

export const getEditProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("admin/manage-product", {
      pageTitle: "Edit " + product.title,
      currentPath: "admin/add-product",
      product: product,
      edit: true,
    });
  });
};

export const postEditProduct = (req, res) => {
  Product.editProduct(req.params.productId, req.body);
  // Cart.updateItem(id, title, price);
  res.redirect("/admin/products");
};

export const postDeleteProduct = (req, res) => {
  const productId = req.body._id;
  Product.deleteProduct(productId);
  // Cart.removeItem(productId);
  res.redirect("/admin/products");
};
