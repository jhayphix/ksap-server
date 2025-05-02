import express from "express";
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  uploadFileResponse,
} from "../controllers/applicationController.js";

import upload from "../middleware/fileUpload.js";

const router = express.Router();

// File upload route (important: must come before :id to avoid conflict)
router.post("/upload", upload.single("file"), uploadFileResponse);

// Other routes
router.get("/", getApplications);
router.get("/:id", getApplication);
router.post("/", createApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
