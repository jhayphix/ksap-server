import { z } from "zod";

// --- Safe Parsers ---
const safeString = z.union([z.string(), z.null(), z.undefined()]).transform(val => val ?? "");
const safeBoolean = z.union([z.boolean(), z.null(), z.undefined()]).transform(val => !!val);
const safeArray = (item) =>
  z.union([z.array(item), z.null(), z.undefined()]).transform((val) => val ?? []);

const safeDate = z.union([z.coerce.date(), z.string(), z.null(), z.undefined()]).transform(val => val ? new Date(val) : new Date());

// --- Subschemas ---
const regexSchema = z.object({
  pattern: safeString,
  errorMessage: safeString,
  comparismOperator: safeString,
});

const fileUploadConfigSchema = z.object({
  restrictFileTypes: safeBoolean,
  allowedFileTypes: safeArray(z.string()),
  maxFileSize: safeString,
});

const sectionQuestionSchema = z.object({
  id: safeString,
  order: z.coerce.number().default(0),
  label: safeString,
  description: safeString,
  type: safeString,
  required: safeBoolean,
  validation: safeBoolean,
  regex: regexSchema.optional(),
  fileUploadConfig: fileUploadConfigSchema.optional(),
  options: safeArray(z.string()),
});

const applicationSectionSchema = z.object({
  id: safeString,
  sectionTitle: safeString,
  sectionDescription: safeString,
  sectionOrder: z.coerce.number().default(0),
  sectionQuestions: safeArray(sectionQuestionSchema),
});

// --- Main Schema ---
export const scholarshipSchema = z.object({
  academicYear: safeString,
  applicationSections: safeArray(applicationSectionSchema),
  createdByAdminId: safeString,
  deadline: safeDate,
  description: safeString,
  eligibilityEducationalLevel: safeArray(z.string()),
  eligibilityYearsOfStudy: safeArray(z.coerce.string()),
  externalId: safeString,
  fundingType: safeString,
  name: safeString,
  requirements: safeArray(z.string()),
  shortName: safeString,
  updatedByAdminId: safeString,
});
