import express from "express";
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// Get all applications
router.get("/", getApplications);

// Get single application
router.get("/:id", getApplication);

// Create new application
router.post("/", createApplication);

// Update application
router.put("/:id", updateApplication);

// Delete application
router.delete("/:id", deleteApplication);

export default router;
