import { z } from "zod";

export const externalScholarshipSchema = z.object({
  createdAt: z.coerce.date().optional(),
  createdByAdminId: z.string(),
  deadline: z.coerce.date(),
  externalId: z.string(),
  isActive: z.boolean().optional().default(true),
  name: z.string(),
  sponsor: z.string(),
  updatedAt: z.coerce.date().optional(),
  updatedByAdminId: z.string(),
  url: z.string().url(),
});
