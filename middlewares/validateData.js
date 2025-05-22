import { body } from "express-validator";

import User from "../models/userModel.js";

export const validateEmail = body("email", "Invalid Email Syntax")
  .isEmail()
  .normalizeEmail();

export const validateEmailCSignup = body("email", "Invalid Email Syntax")
  .isEmail()
  .normalizeEmail()
  .custom((value) =>
    User.findOne({ email: value }).then((userExist) => {
      if (userExist) {
        return Promise.reject("Email already exists");
      }
    })
  );

export const validatePassword = body("password", "Invalid Password Syntax")
  .trim()
  .isLength({ min: 8 });

export const validateConfirmPassword = body("confirmPassword")
  .trim()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  });

export const validateTitle = body("title", "Invalid Title")
  .trim()
  .isLength({ min: 3 });

export const validatePrice = body("price", "Invalid Price").trim().isNumeric();

export const validateDescription = body("description", "Invalid Description")
  .trim()
  .isLength({ min: 10 });
