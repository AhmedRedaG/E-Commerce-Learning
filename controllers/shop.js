import Order from "../models/orderModel.js";

export const getCart = (req, res) => {
  const cart = req.user.getCart();
  const totalPrice = req.user.getTotalPrice();
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    currentPath: "/cart",
    products: cart,
    totalPrice: totalPrice,
  });
};

export const postCart = (req, res) => {
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
  req.user
    .clearCart()
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const getCheckout = (req, res) => {
  const cart = [];
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    currentPath: "/checkout",
    cart: cart,
  });
};

export const postCheckout = (req, res) => {
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

export const getOrders = (req, res) => {
  Order.find({ userId: req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        currentPath: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};
