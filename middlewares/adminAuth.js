const isAdminAuth = (req, res, next) => {
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
  next();
};

export default isAdminAuth;
