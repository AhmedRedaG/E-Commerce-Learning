export const getShop = (req, res) => {
  res.render("root", {
    pageTitle: "Our Shop",
    currentPath: "/",
    isAuthenticated: req.user ? true : false,
    role: req.user ? req.user.role : "user",
  });
};
