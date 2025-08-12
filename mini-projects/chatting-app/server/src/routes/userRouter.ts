import { Router } from "express";
import { getUserInfo } from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();

router.get("/me", authTokenVerifier, getUserInfo);

export default () => router;
