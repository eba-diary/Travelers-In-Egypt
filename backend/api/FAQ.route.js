import express from "express";
import FAQController from "../api/FAQ.controller"

const router = express.Router()
router.route("/answer").get(FAQController.apiGetAnswers)

export default router;
