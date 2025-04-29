import mongoose from "mongoose";

// External Scholarship Schema
const externalScholarshipSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  createdByAdminId: { type: String, required: true },
  deadline: { type: Date, required: true },
  externalId: { type: String, required: true },
  isActive: { type: Boolean, default: true }, // Changed from string to Boolean
  name: { type: String, required: true },
  sponsor: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  updatedByAdminId: { type: String, required: true },
  url: { type: String, required: true },
});

// Create External Scholarship model
const ExternalScholarship = mongoose.model(
  "ExternalScholarship",
  externalScholarshipSchema
);

export default ExternalScholarship;
