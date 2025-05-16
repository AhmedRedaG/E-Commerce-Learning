import Router from "express";

import * as authController from "../controllers/auth.js";

const router = Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

// router.get("/signup", authController.getSignup);

// router.post("/signup", authController.postSignup);

// router.post("/logout", authController.postLogout);

export default router;
