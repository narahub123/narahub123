import { Router } from "express";
import { checkEmailDuplicate, login, signup } from "../controllers";

const router = Router();

router.get("/email-duplication-check", checkEmailDuplicate);
router.post("/signup", signup);
router.post("/login", login);

export default () => router;
