import Router from "express";

import * as authController from "../controllers/auth.js";

const router = Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.post("/logout", authController.postLogout);

router.get("/verify", authController.getVerify);

router.post("/verify", authController.postVerify);

router.post("/check", authController.postCheckToken);

router.get("/reset/:hashedToken", authController.getReset);

router.post("/reset", authController.postReset);

export default router;
