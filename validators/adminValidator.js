import { z } from "zod";

const safeString = z
  .union([z.string(), z.null()])
  .transform((val) => val ?? "");
const safeDate = z
  .union([z.string(), z.date(), z.null()])
  .transform((val) => (val ? new Date(val) : null));

export const adminSchema = z.object({
  externalId: safeString,
  createdByAdminId: safeString,
  createdAt: safeDate.default(() => new Date()),
  updatedByAdminId: safeString,
  updatedAt: safeDate.default(() => new Date()),
  role: safeString.default("Admin"),
  accountStatus: z.enum(["Active", "Deactivated"]).default("Active"),
  deactivatedAt: safeDate.nullable().default(null),
  deactivatedByAdminId: safeString.nullable().default(null),
  deadline: safeDate.nullable().default(null),
  lastName: safeString,
  firstName: safeString,
  otherNames: safeString,
  dateOfBirth: safeDate,
  nationality: safeString,
  phoneNumber: safeString,
  email: safeString,
  authEmail: safeString,
  location: safeString,
  gender: safeString,
  assignedRole: safeString,
  fullName: safeString,
  isSuperAdmin: z.boolean().default(false),
  isApprovalManager: z.boolean().default(false),
  isReviewManager: z.boolean().default(false),
});
