import { Router } from "express";
import { checkEmailDuplicate, login, oauth, signup } from "../controllers";

const router = Router();

router.get("/email-duplication-check", checkEmailDuplicate);
router.post("/signup", signup);
router.post("/login", login);
router.get("/oauth", oauth);

export default () => router;
