import Router from "express";

import * as shopController from "../controllers/shop.js";

const router = Router();

router.get("/", shopController.getCart);

router.post("/", shopController.postCart);

router.post("/increase", shopController.postIncreaseCart);

router.post("/decrease", shopController.postDecreaseCart);

router.post("/remove", shopController.postRemoveFromCart);

router.post("/clear", shopController.postClearCart);

export default router;
