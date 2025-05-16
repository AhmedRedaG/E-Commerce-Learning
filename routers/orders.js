import Router from "express";

import * as shopController from "../controllers/shop.js";

const router = Router();

router.get("/", shopController.getOrders);

router.post("/", shopController.postOrders);

export default router;
