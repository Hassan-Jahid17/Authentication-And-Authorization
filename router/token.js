import { Router } from "express";
import { refresh, revoke } from "../controller/tokenController.js";

const router = Router();

router.post('/', refresh);

router.delete('/', revoke);

export default router;