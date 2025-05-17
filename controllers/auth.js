import User from "../models/userModel.js";

export const getLogin = (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/");
  }
  res.render("auth/login", {
    pageTitle: "Login",
    currentPath: "/login",
    signup: false,
  });
};

export const postLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/signup");
      }
      if (user.password !== password) {
        return res.redirect("/login");
      }
      res.redirect("/");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const getSignup = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Signup",
    currentPath: "/signup",
    signup: true,
  });
};

export const postSignup = (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password, cart: [] });
  user
    .save()
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};
