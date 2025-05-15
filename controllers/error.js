export const get404 = (req, res) => {
  res.status(404).render("error", {
    pageTitle: "Page Not Found",
    currentPath: "",
    err: "Page Not Found",
  });
};
