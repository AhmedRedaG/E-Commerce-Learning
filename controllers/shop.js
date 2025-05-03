const getCart = (req, res) => {
  const cart = [];
  res.render("user/cart", {
    pageTitle: "Your Cart",
    currentPath: "/cart",
    cart: cart,
  });
};

const getCheckout = (req, res) => {
  const cart = [];
  res.render("user/checkout", {
    pageTitle: "Checkout",
    currentPath: "/checkout",
    cart: cart,
  });
};

export { getCart, getCheckout };
