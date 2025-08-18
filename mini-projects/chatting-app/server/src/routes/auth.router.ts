import { Router } from "express";
import {
  checkEmailDuplicate,
  login,
  logout,
  oauth,
  signup,
} from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();

router.get("/email-duplication-check", checkEmailDuplicate);
router.get("/oauth", oauth);
router.post("/signup", signup);
router.post("/logout", authTokenVerifier, logout);
router.post("/login", login);

export default () => router;
