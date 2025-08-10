import { Router } from "express";
import { checkEmailDuplicate } from "../controllers";

const router = Router();

router.get("/email-duplication-check", checkEmailDuplicate);

export default () => router;
