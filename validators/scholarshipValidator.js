import { z } from "zod";

const regexSchema = z.object({
  pattern: z.string().optional(),
  errorMessage: z.string().optional(),
  comparismOperator: z.string().optional(),
});

const sectionQuestionSchema = z.object({
  id: z.string(),
  order: z.number(),
  label: z.string(),
  description: z.string(),
  type: z.string(),
  required: z.boolean(),
  validation: z.boolean(),
  regex: regexSchema.optional(),
  options: z.array(z.string()).optional(),
});

const applicationSectionSchema = z.object({
  id: z.string(),
  sectionTitle: z.string(),
  sectionDescription: z.string(),
  sectionOrder: z.number(),
  sectionQuestions: z.array(sectionQuestionSchema),
});

export const scholarshipSchema = z.object({
  academicYear: z.string(),
  applicationSections: z.array(applicationSectionSchema),
  createdByAdminId: z.string(),
  deadline: z.coerce.date(),
  description: z.string().optional(),
  eligibilityEducationalLevel: z.array(z.string()),
  eligibilityYearsOfStudy: z.array(z.coerce.string()), // Ensure eligibilityYearsOfStudy is an array of strings
  externalId: z.string(),
  fundingType: z.string(),
  name: z.string(),
  requirements: z.array(z.string()),
  shortName: z.string(),
  updatedByAdminId: z.string(),
});