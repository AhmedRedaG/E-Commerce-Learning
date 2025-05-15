export const get404 = (req, res) => {
  res.status(404).render("error", {
    pageTitle: "Page Not Found",
    currentPath: "",
    error: "Page Not Found",
  });
};
