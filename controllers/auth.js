import User from "../models/userModel.js";

import bcrypt from "bcryptjs";

export const getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("auth/login", {
    pageTitle: "Login",
    currentPath: "/login",
    signup: false,
    errorMessage: req.flash("error"),
  });
};

export const postLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Email not found please signup");
        return res.redirect("/signup");
      }
      bcrypt.compare(password, user.password).then((isMatched) => {
        if (!isMatched) {
          req.flash("error", "Invalid password try again");
          return res.redirect("/login");
        }
        req.session.userId = user._id;
        req.session.save((err) => {
          if (err) {
            res.render("error", { pageTitle: "Error", currentPath: "", err });
          }
          res.redirect("/");
        });
      });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("auth/login", {
    pageTitle: "Signup",
    currentPath: "/signup",
    signup: true,
    errorMessage: req.flash("error"),
  });
};

export const postSignup = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match");
    return res.redirect("/signup");
  }
  User.findOne({ email })
    .then((userExist) => {
      if (userExist) {
        req.flash("error", "Email already exists");
        return res.redirect("/signup");
      }
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const user = new User({
            name,
            email,
            password: hashedPassword,
            cart: [],
          });
          return user.save();
        })
        .then(() => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    });
};

export const postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.render("error", { pageTitle: "Error", currentPath: "", err });
    }
    res.redirect("/");
  });
};
