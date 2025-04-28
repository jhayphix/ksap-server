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
  applicantId: { type: String, required: true },
  reviewedAt: { type: Date },
  isApproved: { type: Boolean, default: false },
  approvedByAdminId: { type: String, default: null },
  isQualified: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
  externalId: { type: String, required: true },
  reviewedByAdminId: { type: String },
  appliedAt: { type: Date, default: Date.now },
  applicationStatus: {
    type: String,
    enum: ["Disqualified", "Pending", "Approved"],
    default: "Pending",
  },
  isPendingApproval: { type: Boolean, default: false },
  id: { type: String },
  approvalComment: { type: String, default: "" },
  isReviewed: { type: Boolean, default: false },
  approvalStatus: { type: String, default: "Awaiting Approval" },
  isProcessed: { type: Boolean, default: false },
  progress: progressSchema,
  responseSections: [responseSectionSchema],
  isDisapproved: { type: Boolean, default: false },
  applicationScore: { type: String, default: "" },
  reviewStatus: { type: String, default: "Pending" },
  approvedAt: { type: Date, default: null },
  isDisqualified: { type: Boolean, default: false },
  reviewedAcademicScore: { type: String, default: "" },
  isPendingReview: { type: Boolean, default: false },
  scholarshipId: { type: String, required: true },
  reviewComment: { type: String, default: null },
});

// Create Application model
const Application = mongoose.model("Application", applicationSchema);

export default Application;
