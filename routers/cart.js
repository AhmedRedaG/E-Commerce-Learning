import Router from "express";

import * as shopController from "../controllers/shop.js";

const router = Router();

router.get("/cart", shopController.getCart);

export default router;
