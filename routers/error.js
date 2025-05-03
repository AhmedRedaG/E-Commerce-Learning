import Router from "express";

import * as errorController from "../controllers/error.js";

const router = Router();

router.use(errorController.get404);

export default router;
