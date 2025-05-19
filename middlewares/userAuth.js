const isUserAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role === "admin") {
    return res.redirect("/admin/products");
  }
  next();
};

export default isUserAuth;
