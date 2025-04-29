import { z } from "zod";

// Response Schema
const responseSchema = z.object({
  id: z.string(),
  order: z.number(),
  label: z.string(),
  response: z.any(),
  questionId: z.string(),
  type: z.string(),
});

// Progress Schema
const progressSchema = z.object({
  isCompleted: z.boolean(),
  completedSections: z.array(z.string()),
  lastCompletedSectionIndex: z.number(),
  percentage: z.number(),
  lastCompletedSection: z.string(),
});

// Response Section Schema
const responseSectionSchema = z.object({
  id: z.string(),
  sectionId: z.string(),
  sectionTitle: z.string(),
  responses: z.array(responseSchema),
});

// Main Application Schema
export const applicationSchema = z.object({
  approvalComment: z.string().optional().default(""),
  approvalStatus: z.string().optional().default("Awaiting Approval"),
  approvedAt: z.coerce.date().nullable().optional(),
  approvedByAdminId: z.string().nullable().optional(),
  applicationScore: z.string().optional().default(""),
  applicationStatus: z.string().optional().default("Pending"),
  applicantId: z.string(),
  appliedAt: z.coerce.date().optional(),
  isApproved: z.boolean().optional().default(false),
  isDisapproved: z.boolean().optional().default(false),
  isDisqualified: z.boolean().optional().default(false),
  isPendingApproval: z.boolean().optional().default(false),
  isPendingReview: z.boolean().optional().default(false),
  isProcessed: z.boolean().optional().default(false),
  isQualified: z.boolean().optional().default(false),
  isReviewed: z.boolean().optional().default(false),
  progress: progressSchema.optional(),
  reviewComment: z.string().nullable().optional(),
  reviewStatus: z.string().optional().default("Pending"),
  reviewedAcademicScore: z.string().optional().default(""),
  reviewedAt: z.coerce.date().optional(),
  reviewedByAdminId: z.string().optional(),
  responseSections: z.array(responseSectionSchema),
  scholarshipId: z.string(),
  updatedAt: z.coerce.date().optional(),
  externalId: z.string(),
});
