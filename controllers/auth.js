import User from "../models/userModel.js";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import mailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import dotenv from "dotenv";
import { nextTick } from "process";

dotenv.config();

const transporter = mailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

export const getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  const email = req.query.email;
  res.status(email ? 422 : 200).render("auth/login", {
    pageTitle: "Login",
    currentPath: "/login",
    signup: false,
    errorMessage: req.flash("error"),
    oldValues: { email: email || "" },
  });
};

export const postLogin = (req, res, next) => {
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
            return next(err);
          }
          res.redirect("/");
        });
      });
    })
    .catch((err) => {
      return next(err);
    });
};

export const getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  const { name, email } = req.query;
  res.status(email ? 422 : 200).render("auth/login", {
    pageTitle: "Signup",
    currentPath: "/signup",
    signup: true,
    errorMessage: req.flash("error"),
    oldValues: { name: name || "", email: email || "" },
  });
};

export const postSignup = (req, res, next) => {
  const { name, email, password } = req.body;
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
      transporter.sendMail({
        to: email,
        from: "ahmdfarok2@gmail.com",
        subject: "Signup Succeeded!",
        html: "<h1>You successfully signed up!</h1>",
      });
    })
    .catch((err) => {
      return next(err);
    });
};

export const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export const getVerify = (req, res) => {
  res.render("auth/verify", {
    pageTitle: "Reset Password",
    currentPath: "/verify",
    mailChecked: false,
    errorMessage: req.flash("error"),
  });
};

export const postVerify = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Email not found please signup");
        return res.redirect("/signup");
      }
      const token = crypto.randomInt(100000, 999999).toString();
      transporter.sendMail({
        to: user.email,
        from: "ahmdfarok2@gmail.com",
        subject: "Reset Password",
        html: ` <p>Your one-time password (OTP) to reset your account is:</p>
                <h2>${token}</h2>
                <p>This code is valid for 10 minutes. Do not share it with anyone.</p>
                `,
      });
      return bcrypt
        .hash(token, 10)
        .then((hashedToken) => {
          user.resetToken.hashedToken = hashedToken;
          user.resetToken.expiration = Date.now() + 600000; // 10m
          return user.save();
        })
        .then((user) => {
          res.render("auth/verify", {
            pageTitle: "Reset Password",
            currentPath: "/verify",
            mailChecked: true,
            email: user.email,
            errorMessage: req.flash("error"),
          });
        });
    })
    .catch((err) => {
      return next(err);
    });
};

export const postCheckToken = (req, res, next) => {
  const { email, resetToken } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "This mail is not found try again");
        return res.redirect("/verify");
      }
      if (user.resetToken.expiration < Date.now()) {
        req.flash("error", "Time expired please try again");
        return res.redirect("/verify");
      }
      bcrypt
        .compare(resetToken, user.resetToken.hashedToken)
        .then((checked) => {
          if (!checked) {
            req.flash("error", "Wrong token please try again");
            return res.redirect("/verify");
          }
          res.redirect(
            `reset/${encodeURIComponent(user.resetToken.hashedToken)}`
          );
        });
    })
    .catch((err) => {
      return next(err);
    });
};

export const getReset = (req, res) => {
  const hashedToken = decodeURIComponent(req.params.hashedToken);
  res.render("auth/reset", {
    pageTitle: "Reset Password",
    currentPath: "/reset",
    errorMessage: req.flash("error"),
    hashedToken,
  });
};

export const postReset = (req, res, next) => {
  const { password, hashedToken } = req.body;
  User.findOne({ "resetToken.hashedToken": hashedToken })
    .then((user) => {
      if (!user) {
        req.flash("error", "Wrong token");
        return res.redirect("/verify");
      }
      if (user.resetToken.expiration < Date.now()) {
        req.flash("error", "Time expired please try again");
        return res.redirect("/verify");
      }
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          user.password = hashedPassword;
          user.resetToken = { hashedToken: null, expiration: null };
          return user.save();
        })
        .then(() => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      return next(err);
    });
};
