import mongoose from "mongoose";

// Admin Schema
const adminSchema = new mongoose.Schema({
  accountStatus: { type: String, default: "Active", required: true },
  assignedRole: { type: String, required: true },
  authDisplayName: { type: String },
  authEmail: { type: String },
  authPhoneNumber: { type: String, default: null },
  authPhotoURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  createdByAdminId: { type: String },
  dateOfBirth: { type: Date, required: true },
  deactivatedAt: { type: Date, default: null },
  deactivatedByAdminId: { type: String, default: null },
  email: { type: String, required: true },
  externalId: { type: String, required: true },
  firstName: { type: String, required: true },
  fullName: { type: String },
  gender: { type: String, required: true },
  isApprovalManager: { type: Boolean, default: false },
  isReviewManager: { type: Boolean, default: false },
  isSuperAdmin: { type: Boolean, default: false },
  lastName: { type: String, required: true },
  location: { type: String, required: true },
  nationality: { type: String, required: true },
  otherNames: { type: String },
  phoneNumber: { type: String, required: true },
  role: { type: String, default: "Admin" },
  uid: { type: String },
  updatedAt: { type: Date, default: Date.now },
  updatedByAdminId: { type: String },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
