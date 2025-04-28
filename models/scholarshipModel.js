import mongoose from "mongoose";

// Define Sub-Schema for Section Questions
const sectionQuestionSchema = new mongoose.Schema({
  id: { type: String },
  order: { type: Number },
  label: { type: String },
  description: { type: String },
  type: { type: String },
  required: { type: Boolean },
  validation: { type: Boolean },
  regex: {
    pattern: { type: String },
    errorMessage: { type: String },
    comparismOperator: { type: String },
  },
  options: [
    {
      type: String,
    },
  ],
});

// Define Sub-Schema for Application Sections
const applicationSectionSchema = new mongoose.Schema({
  id: { type: String },
  sectionTitle: { type: String },
  sectionDescription: { type: String },
  sectionOrder: { type: Number },
  sectionQuestions: [sectionQuestionSchema],
});

// Main Scholarship Schema
const scholarshipSchema = new mongoose.Schema({
  academicYear: { type: String, required: true },
  applicationSections: [applicationSectionSchema], // Reference to applicationSection schema
  createdAt: { type: Date, default: Date.now },
  createdByAdminId: { type: String, required: true },
  deadline: { type: Date, required: true },
  description: { type: String, default: "" },
  eligibilityEducationalLevel: { type: [String], required: true },
  eligibilityYearsOfStudy: { type: [String], required: true },
  externalId: { type: String, required: true },
  fundingType: { type: String, required: true },
  name: { type: String, required: true },
  requirements: { type: [String], required: true },
  shortName: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  updatedByAdminId: { type: String, required: true },
});

// Create Scholarship model
const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export default Scholarship;
