import { z } from "zod";

// Guardian Details Schema
const guardianDetailsSchema = z.object({
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianLocation: z.string().optional(),
  guardianOccupation: z.string().optional(),
  guardianRelationship: z.string().optional(),
});

// Applicant Schema
export const applicantSchema = z.object({
  uid: z.string().optional(),
  externalId: z.string(),
  role: z.string().default("Applicant"),
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  otherNames: z.string().optional(),
  gender: z.string(),
  nationality: z.string().optional(),
  dateOfBirth: z.coerce.date(),
  age: z.string(),
  phoneNumber: z.string(),
  telecelNumber: z.string().optional(),
  email: z.string().email(),
  authEmail: z.string().optional(),
  authPhoneNumber: z.string().optional(),
  authPhotoURL: z.string().optional(),
  authDisplayName: z.string().optional(),
  indexNumber: z.string(),
  referenceNumber: z.string(),
  college: z.string().optional(),
  faculty: z.string().optional(),
  department: z.string().optional(),
  programmeOfStudy: z.string(),
  durationOfProgramme: z.string(),
  yearOfStudy: z.string(),
  educationalLevel: z.string(),
  modeOfAdmission: z.string(),
  guardianDetails: guardianDetailsSchema.optional(),
  accountStatus: z.enum(["Active", "Deactivated"]).optional(),
  deactivatedByAdminId: z.string().nullable().optional(),
  deactivatedAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const applicantUpdateSchema = applicantSchema.partial();