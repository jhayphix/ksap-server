import express from "express";
import {
  getApplicants,
  getApplicant,
  createApplicant,
  updateApplicant,
  deleteApplicant,
} from "../controllers/applicantController.js";

const router = express.Router();

// Get all applicants
router.get("/", getApplicants);

// Get single applicant
router.get("/:id", getApplicant);

// Create new applicant
router.post("/", createApplicant);

// Update applicant
router.put("/:id", updateApplicant);

// Delete applicant
router.delete("/:id", deleteApplicant);

export default router;
