import Cart from "../models/cartModel.js";

export const getCart = (req, res) => {
  Cart.fetchAll((cartItems) => {
    // const totalPrice = Cart.getTotalPrice();
    res.render("user/cart", {
      pageTitle: "Your Cart",
      currentPath: "/cart",
      products: cartItems,
      totalPrice: 100,
    });
  });
};

export const postCart = (req, res) => {
  const productId = req.body.productId;
  Cart.addItem(productId);
  res.redirect("/products");
};

export const postAddToCart = (req, res) => {
  const productId = req.body.productId;
  Cart.addItem(productId);
  res.redirect("/products");
};

export const postIncreaseCart = (req, res) => {
  const productId = req.body.productId;
  Cart.addItem(productId);
  res.redirect("/cart");
};

export const postDecreaseCart = (req, res) => {
  const productId = req.body.productId;
  Cart.decreaseItem(productId);
  res.redirect("/cart");
};

export const postRemoveFromCart = (req, res) => {
  const productId = req.body.productId;
  Cart.removeItem(productId);
  res.redirect("/cart");
};

export const postClearCart = (req, res) => {
  Cart.clear();
  res.redirect("/cart");
};

export const getCheckout = (req, res) => {
  const cart = [];
  res.render("user/checkout", {
    pageTitle: "Checkout",
    currentPath: "/checkout",
    cart: cart,
  });
};
