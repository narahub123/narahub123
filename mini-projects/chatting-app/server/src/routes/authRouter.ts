import { Router } from "express";
import { checkEmailDuplicate, signup } from "../controllers";

const router = Router();

router.get("/email-duplication-check", checkEmailDuplicate);
router.post("/signup", signup);

export default () => router;
