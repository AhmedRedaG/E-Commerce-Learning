import Router from "express";

import * as shopController from "../controllers/shop.js";

const router = Router();

router.get("/checkout", shopController.getCheckout);

router.post("/checkout", shopController.postCheckout);

export default router;
