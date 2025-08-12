import { Router } from "express";
import { getUserInfo } from "../controllers";

const router = Router();

router.get("/me", getUserInfo);

export default () => router;
