import Product from "../models/productModel.js";

const getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    currentPath: "/admin/add-product",
  });
};

const postAddProduct = (req, res) => {
  const { title, description, price } = req.body;
  const newProduct = new Product(title, description, price);
  newProduct.save();
  res.redirect("/products");
};

const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("user/products", {
      pageTitle: "All Products",
      currentPath: "/products",
      products: products,
    });
  });
};

const getAdminProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      currentPath: "/admin/products",
      products: products,
    });
  });
};

const getProductById = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("user/product-detail", {
      pageTitle: product.title,
      currentPath: "/products",
      product: product,
    });
  });
};

export {
  getAddProduct,
  postAddProduct,
  getProducts,
  getAdminProducts,
  getProductById,
};
