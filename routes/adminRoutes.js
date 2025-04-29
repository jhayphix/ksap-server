import express from "express";
import {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// Get all admins
router.get("/", getAdmins);

// Get single admin
router.get("/:id", getAdmin);

// Create new admin
router.post("/", createAdmin);

// Update admin
router.put("/:id", updateAdmin);

// Delete admin
router.delete("/:id", deleteAdmin);

export default router;
