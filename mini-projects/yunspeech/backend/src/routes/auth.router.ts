import { Router } from "express";
import { oauth } from "../controllers";

const router = Router();

router.get("/oauth", oauth);

export default () => router;
