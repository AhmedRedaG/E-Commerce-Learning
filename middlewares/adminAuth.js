const isAdminAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  if (req.user.role !== "admin") {
    return res.status(401).render("error", {
      pageTitle: "Unauthorized",
      currentPath: "",
      err: "You are not authorized to view this page",
    });
  }
  next();
};

export default isAdminAuth;
