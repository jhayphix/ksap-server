import express from "express";
import {
  getScholarships,
  getScholarship,
  createScholarship,
  updateScholarship,
  deleteScholarship,
} from "../controllers/scholarshipController.js";

const router = express.Router();

// Get all scholarships
router.get("/", getScholarships);

// Get single scholarship
router.get("/:id", getScholarship);

// Create new scholarship
router.post("/", createScholarship);

// Update scholarship
router.put("/:id", updateScholarship);

// Delete scholarship
router.delete("/:id", deleteScholarship);

export default router;
