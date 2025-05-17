import Product from "../models/productModel.js";

export const getProducts = (req, res) => {
  if (req.user) {
    if (req.user.role === "admin") {
      return res.redirect("/admin/products");
    }
  }
  Product.find()
    .then((products) => {
      res.render("shop/products", {
        pageTitle: "All Products",
        currentPath: "/products",
        products: products,
        isAuthenticated: req.user ? true : false,
        role: "user",
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const getAdminProducts = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role !== "admin") {
    return res.render("error", {
      pageTitle: "Error",
      currentPath: "",
      err: "You are not authorized to view this page",
    });
  }
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        currentPath: "/admin/products",
        products: products,
        isAuthenticated: true,
        role: "admin",
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
        isAuthenticated: req.user ? true : false,
        role: req.user ? req.user.role : "user",
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const getAddProduct = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role !== "admin") {
    return res.render("error", {
      pageTitle: "Error",
      currentPath: "",
      err: "You are not authorized to view this page",
    });
  }
  res.render("admin/manage-product", {
    pageTitle: "Add Product",
    currentPath: "/admin/add-product",
    edit: false,
    isAuthenticated: true,
    role: "admin",
  });
};

export const postAddProduct = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role !== "admin") {
    return res.render("error", {
      pageTitle: "Error",
      currentPath: "",
      err: "You are not authorized to view this page",
    });
  }
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
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role !== "admin") {
    return res.render("error", {
      pageTitle: "Error",
      currentPath: "",
      err: "You are not authorized to view this page",
    });
  }
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("admin/manage-product", {
        pageTitle: "Edit " + product.title,
        currentPath: "admin/add-product",
        product: product,
        edit: true,
        isAuthenticated: true,
        role: "admin",
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postEditProduct = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role !== "admin") {
    return res.render("error", {
      pageTitle: "Error",
      currentPath: "",
      err: "You are not authorized to view this page",
    });
  }
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
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role !== "admin") {
    return res.render("error", {
      pageTitle: "Error",
      currentPath: "",
      err: "You are not authorized to view this page",
    });
  }
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
