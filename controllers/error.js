export const get404 = (req, res) => {
  res.status(404).render("error", {
    pageTitle: "Page Not Found",
    currentPath: "",
    err: "Page Not Found",
  });
};

export const get500 = (error, req, res, next) => {
  res.status(500).render("error", {
    pageTitle: "Server Error!",
    currentPath: "",
    err: error,
  });
};
