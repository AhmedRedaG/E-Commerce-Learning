import Router from "express";

import * as shopController from "../controllers/root.js";

const router = Router();

router.get("/", shopController.getShop);

export default router;
