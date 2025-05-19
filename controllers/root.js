export const getShop = (req, res) => {
  res.render("root", {
    pageTitle: "Our Shop",
    currentPath: "/",
  });
};
