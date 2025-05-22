import Router from "express";

import * as authController from "../controllers/auth.js";
import {
  validateEmail,
  validateEmailCSignup,
  validatePassword,
  validateConfirmPassword,
} from "../middlewares/validateData.js";
import {
  validationEmailError,
  validationNameEmailError,
  validationTokenError,
} from "../middlewares/validationError.js";

const router = Router();

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [validateEmail, validatePassword, validationEmailError],
  authController.postLogin
);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    validateEmailCSignup,
    validatePassword,
    validateConfirmPassword,
    validationNameEmailError,
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/verify", authController.getVerify);

router.post(
  "/verify",
  [validateEmail, validationEmailError],
  authController.postVerify
);

router.post(
  "/check",
  [validateEmail, validationEmailError],
  authController.postCheckToken
);

router.get("/reset/:hashedToken", authController.getReset);

router.post(
  "/reset",
  [validatePassword, validateConfirmPassword, validationTokenError],
  authController.postReset
);

export default router;
