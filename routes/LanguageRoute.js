import express from "express";
import upload from "../middleware/upload.js";
import { createLanguage, deleteLanguage, editLanguage, getLanguages, getLanguageById } from "../controller/Language.js";

const router = express.Router();

router.get("/language", getLanguages);
router.get("/language/:id", getLanguageById);
router.post("/language", upload.single('file'), createLanguage);
router.put("/language/:id", editLanguage);
router.delete("/language/:id", deleteLanguage);

export default router;