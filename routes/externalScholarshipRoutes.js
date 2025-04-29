import express from "express";
import {
  getExternalScholarships,
  getExternalScholarship,
  createExternalScholarship,
  updateExternalScholarship,
  deleteExternalScholarship,
} from "../controllers/externalScholarshipController.js";

const router = express.Router();

// Get all external scholarships
router.get("/", getExternalScholarships);

// Get single external scholarship
router.get("/:id", getExternalScholarship);

// Create new external scholarship
router.post("/", createExternalScholarship);

// Update external scholarship
router.put("/:id", updateExternalScholarship);

// Delete external scholarship
router.delete("/:id", deleteExternalScholarship);

export default router;
