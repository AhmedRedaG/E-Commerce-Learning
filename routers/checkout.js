import Router from "express";

import * as shopController from "../controllers/shop.js";

const router = Router();

router.get("/checkout", shopController.getCheckout);

export default router;
