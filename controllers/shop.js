import Cart from "../models/cartModel.js";

import { ObjectId } from "mongodb";

const tempId = new ObjectId("68261320cd1cead4b36d0bf3");

export const getCart = (req, res) => {
  Cart.getCart(tempId)
    .then((cart) => {
      Cart.getTotalPrice(tempId)
        .then((totalPrice) => {
          res.render("shop/cart", {
            pageTitle: "Your Cart",
            currentPath: "/cart",
            products: cart,
            totalPrice: totalPrice,
          });
        })
        .catch((err) => {
          res.render("error", { pageTitle: "Error", currentPath: "", err });
        });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postCart = (req, res) => {
  const productId = req.body.productId;
  Cart.addItem(tempId, productId)
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postAddToCart = (req, res) => {
  const productId = req.body.productId;
  Cart.addItem(tempId, productId)
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postIncreaseCart = (req, res) => {
  const productId = req.body.productId;
  Cart.recountItem(tempId, productId, 1)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postDecreaseCart = (req, res) => {
  const productId = req.body.productId;
  Cart.recountItem(tempId, productId, -1)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postRemoveFromCart = (req, res) => {
  const productId = req.body.productId;
  Cart.removeItem(tempId, productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postClearCart = (req, res) => {
  Cart.clear(tempId)
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
