import Router from "express";
import { body } from "express-validator";

import * as authController from "../controllers/auth.js";
import User from "../models/userModel.js";

const router = Router();

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    body("email", "Invalid Email Syntax").isEmail().normalizeEmail(),
    body("password", "Invalid Password Syntax").trim().isLength({ min: 8 }),
  ],
  authController.postLogin
);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    body("email", "Invalid Email Syntax")
      .isEmail()
      .normalizeEmail()
      .custom((value) =>
        User.findOne({ email: value }).then((userExist) => {
          if (userExist) {
            return Promise.reject("Email already exists");
          }
        })
      ),
    body("password", "Invalid Password Syntax").trim().isLength({ min: 8 }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/verify", authController.getVerify);

router.post(
  "/verify",
  body("email", "Invalid Email Syntax").isEmail().normalizeEmail(),
  authController.postVerify
);

router.post(
  "/check",
  body("email", "Invalid Email Syntax").isEmail().normalizeEmail(),
  authController.postCheckToken
);

router.get("/reset/:hashedToken", authController.getReset);

router.post(
  "/reset",
  [
    body("newPassword", "Invalid Password Syntax").trim().isLength({ min: 8 }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ],
  authController.postReset
);

export default router;
