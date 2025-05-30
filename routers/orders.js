import Router from "express";

import * as shopController from "../controllers/shop.js";
import isUserAuth from "../middlewares/userAuth.js";

const router = Router();

router.get("/", isUserAuth, shopController.getOrders);

router.post("/", isUserAuth, shopController.postOrders);

router.get("/invoice/:orderId", isUserAuth, shopController.getOrderInvoice);

export default router;
