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

export const postCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .addItem(productId)
    .then(() => {
      res.redirect("/products");
    })
    .catch(next);
};

export const postIncreaseCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .recountItem(productId, 1)
    .then(() => {
      res.redirect("/cart");
    })
    .catch(next);
};

export const postDecreaseCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .recountItem(productId, -1)
    .then(() => {
      res.redirect("/cart");
    })
    .catch(next);
};

export const postRemoveFromCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .removeItem(productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch(next);
};

export const postClearCart = (req, res, next) => {
  req.user
    .clearCart()
    .then(() => {
      res.redirect("/cart");
    })
    .catch(next);
};

export const getOrders = (req, res, next) => {
  const userId = req.user._id;
  Order.find({ userId })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        currentPath: "/orders",
        orders: orders,
      });
    })
    .catch(next);
};

export const postOrders = (req, res, next) => {
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
    .catch(next);
};
