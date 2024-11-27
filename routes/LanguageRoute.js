import  upload  from "../middleware/upload.js";
import { uploadFiles } from "../middleware/upload.js";
import express from "express";
import { createLanguage, deleteLanguage, editLanguage, getLanguages, getLanguageById } from "../controller/Language.js";

const router = express.Router();

router.get("/language", getLanguages);
router.get("/language/:id", getLanguageById);
router.post("/language", uploadFiles, createLanguage);
router.put("/language/:id", editLanguage);
router.delete("/language/:id", deleteLanguage);

export default router;