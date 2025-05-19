import Router from "express";

import * as shopController from "../controllers/shop.js";
import isUserAuth from "../middlewares/userAuth.js";

const router = Router();

router.get("/", isUserAuth, shopController.getCart);

router.post("/", isUserAuth, shopController.postCart);

router.post("/increase", isUserAuth, shopController.postIncreaseCart);

router.post("/decrease", isUserAuth, shopController.postDecreaseCart);

router.post("/remove", isUserAuth, shopController.postRemoveFromCart);

router.post("/clear", isUserAuth, shopController.postClearCart);

export default router;
