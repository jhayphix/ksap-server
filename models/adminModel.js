import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  externalId: { type: String, required: true },
  createdByAdminId: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedByAdminId: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now },
  role: { type: String, default: "Admin" },
  accountStatus: {
    type: String,
    enum: ["Active", "Deactivated"],
    default: "Active",
  },
  deactivatedAt: { type: Date, default: null },
  deactivatedByAdminId: { type: String, default: null },
  deadline: { type: Date, default: null },
  lastName: { type: String, default: "" },
  firstName: { type: String, default: "" },
  otherNames: { type: String, default: "" },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  email: { type: String, default: "" },
  authEmail: { type: String, default: "" },
  location: { type: String, default: "" },
  gender: { type: String, default: "" },
  assignedRole: { type: String, default: "" },
  fullName: { type: String, default: "" },
  isSuperAdmin: { type: Boolean, default: false },
  isApprovalManager: { type: Boolean, default: false },
  isReviewManager: { type: Boolean, default: false },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
