import { Router } from "express";

import defi from "./defi";

const router = Router();

router.use("/defi", defi);

export default router;
