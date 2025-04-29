import { z } from "zod";

const safeString = z
  .union([z.string(), z.null()])
  .transform((val) => val ?? "");

const guardianDetailsSchema = z.object({
  guardianName: safeString,
  guardianPhone: safeString,
  guardianLocation: safeString,
  guardianOccupation: safeString,
  guardianRelationship: safeString,
});

export const applicantSchema = z.object({
  uid: safeString,
  externalId: z.string().uuid(),
  role: z.literal("Applicant"),
  fullName: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  otherNames: safeString,
  gender: z.string().min(1),
  nationality: safeString,
  dateOfBirth: z.coerce.date(),
  age: safeString,
  phoneNumber: z.string().min(1),
  telecelNumber: safeString,
  email: z.string().email(),
  authEmail: safeString,
  authPhoneNumber: safeString,
  authPhotoURL: safeString,
  authDisplayName: safeString,
  indexNumber: z.string().min(1),
  referenceNumber: z.string().min(1),
  college: safeString,
  faculty: safeString,
  department: safeString,
  programmeOfStudy: z.string().min(1),
  durationOfProgramme: z.string().min(1),
  yearOfStudy: z.string().min(1),
  educationalLevel: z.string().min(1),
  modeOfAdmission: z.string().min(1),
  guardianDetails: guardianDetailsSchema,
  accountStatus: z.enum(["Active", "Deactivated"]).default("Active"),
  deactivatedByAdminId: z.union([z.string(), z.null()]).default(null),
  deactivatedAt: z.coerce.date().nullable().default(null),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});
