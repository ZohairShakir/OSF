import express from "express";
import { submitProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", submitProject);

export default router;
