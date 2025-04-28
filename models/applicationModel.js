import mongoose from "mongoose";

// Define Sub-Schema for Responses
const responseSchema = new mongoose.Schema({
  id: { type: String },
  order: { type: Number },
  label: { type: String },
  response: { type: String },
  questionId: { type: String },
  type: { type: String },
});

// Define Sub-Schema for Progress
const progressSchema = new mongoose.Schema({
  isCompleted: { type: Boolean },
  completedSections: [{ type: String }],
  lastCompletedSectionIndex: { type: Number },
  percentage: { type: Number },
  lastCompletedSection: { type: String },
});

// Define Sub-Schema for Application Sections
const responseSectionSchema = new mongoose.Schema({
  id: { type: String },
  sectionId: { type: String },
  sectionTitle: { type: String },
  responses: [responseSchema],
});

// Main Application Schema
const applicationSchema = new mongoose.Schema({
  approvalComment: { type: String, default: "" },
  approvalStatus: { type: String, default: "Awaiting Approval" },
  approvedAt: { type: Date, default: null },
  approvedByAdminId: { type: String, default: null },
  applicationScore: { type: String, default: "" },
  applicationStatus: {
    type: String,
    default: "Pending",
  },
  applicantId: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
  isDisapproved: { type: Boolean, default: false },
  isDisqualified: { type: Boolean, default: false },
  isPendingApproval: { type: Boolean, default: false },
  isPendingReview: { type: Boolean, default: false },
  isProcessed: { type: Boolean, default: false },
  isQualified: { type: Boolean, default: false },
  isReviewed: { type: Boolean, default: false },
  progress: progressSchema,
  reviewComment: { type: String, default: null },
  reviewStatus: { type: String, default: "Pending" },
  reviewedAcademicScore: { type: String, default: "" },
  reviewedAt: { type: Date },
  reviewedByAdminId: { type: String },
  responseSections: [responseSectionSchema],
  scholarshipId: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  externalId: { type: String, required: true },
  applicationScore: { type: String, default: "" },
});

// Create Application model
const Application = mongoose.model("Application", applicationSchema);

export default Application;
