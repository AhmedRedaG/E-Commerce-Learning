import User from "../models/userModel.js";

export const getLogin = (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/");
  }
  res.render("auth/login", {
    pageTitle: "Login",
    currentPath: "/login",
  });
};

export const postLogin = (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;
  // User.findOne({ email: email })
  //   .then((user) => {
  //     if (!user) {
  //       return res.redirect("/login");
  //     }
  //     if (user.password !== password) {
  //       return res.redirect("/login");
  //     }
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     res.render("error", { pageTitle: "Error", currentPath: "", err });
  //   });

  req.session.isLoggedIn = true;
  res.redirect("/");
};
