import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";

export const getAddProduct = (req, res) => {
  res.render("admin/manage-product", {
    pageTitle: "Add Product",
    currentPath: "/admin/add-product",
    edit: false,
  });
};

export const postAddProduct = (req, res) => {
  const { id = null, title, description, price } = req.body;
  const newProduct = new Product(id, title, description, price);
  newProduct.save();
  Cart.updateItem(id, title, price);
  res.redirect("/admin/products");
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

export const postDeleteProduct = (req, res) => {
  const productId = req.body.id;
  console.log(productId);
  Product.deleteProduct(productId);
  Cart.removeItem(productId);
  res.redirect("/admin/products");
};

export const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("user/products", {
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
    res.render("user/product-detail", {
      pageTitle: product.title,
      currentPath: "/products",
      product: product,
    });
  });
};
