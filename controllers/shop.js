import Order from "../models/orderModel.js";

export const getCart = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role === "admin") {
    return res.redirect("/admin/products");
  }
  const cart = req.user.getCart();
  const totalPrice = req.user.getTotalPrice();
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    currentPath: "/cart",
    products: cart,
    totalPrice: totalPrice,
    isAuthenticated: true,
    role: "user",
  });
};

export const postCart = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role === "admin") {
    return res.redirect("/admin/products");
  }
  const productId = req.body.productId;
  req.user
    .addItem(productId)
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postIncreaseCart = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role === "admin") {
    return res.redirect("/admin/products");
  }
  const productId = req.body.productId;
  req.user
    .recountItem(productId, 1)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postDecreaseCart = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role === "admin") {
    return res.redirect("/admin/products");
  }
  const productId = req.body.productId;
  req.user
    .recountItem(productId, -1)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postRemoveFromCart = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role === "admin") {
    return res.redirect("/admin/products");
  }
  const productId = req.body.productId;
  req.user
    .removeItem(productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postClearCart = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role === "admin") {
    return res.redirect("/admin/products");
  }
  req.user
    .clearCart()
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const getOrders = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role === "admin") {
    return res.redirect("/admin/products");
  }
  const userId = req.user._id;
  Order.find({ userId })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        currentPath: "/orders",
        orders: orders,
        isAuthenticated: true,
        role: "user",
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postOrders = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role === "admin") {
    return res.redirect("/admin/products");
  }
  const userId = req.user._id;
  const products = req.user.getCart();
  const totalPrice = req.user.getTotalPrice();
  const order = new Order({
    userId,
    products,
    totalPrice,
  });
  order
    .save()
    .then(() => {
      req.user.clearCart();
      res.redirect("/orders");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};
