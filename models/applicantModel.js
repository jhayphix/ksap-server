import mongoose from "mongoose";

const guardianDetailsSchema = new mongoose.Schema({
  guardianName: { type: String, default: "" },
  guardianPhone: { type: String, default: "" },
  guardianLocation: { type: String, default: "" },
  guardianOccupation: { type: String, default: "" },
  guardianRelationship: { type: String, default: "" },
});

const applicantSchema = new mongoose.Schema({
  uid: { type: String, default: "" },
  externalId: { type: String, required: true },
  role: { type: String, enum: ["Applicant"], default: "Applicant" },
  fullName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  otherNames: { type: String, default: "" },
  gender: { type: String, required: true },
  nationality: { type: String, default: "" },
  dateOfBirth: { type: Date, required: true },
  age: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  telecelNumber: { type: String, default: "" },
  email: { type: String, required: true },
  authEmail: { type: String, default: "" },
  authPhoneNumber: { type: String, default: "" },
  authPhotoURL: { type: String, default: "" },
  authDisplayName: { type: String, default: "" },
  indexNumber: { type: String, required: true },
  referenceNumber: { type: String, required: true },
  college: { type: String, default: "" },
  faculty: { type: String, default: "" },
  department: { type: String, default: "" },
  programmeOfStudy: { type: String, required: true },
  durationOfProgramme: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  educationalLevel: { type: String, required: true },
  modeOfAdmission: { type: String, required: true },
  guardianDetails: { type: guardianDetailsSchema, default: () => ({}) },
  accountStatus: {
    type: String,
    enum: ["Active", "Deactivated"],
    default: "Active",
  },
  deactivatedByAdminId: { type: String, default: null },
  deactivatedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Applicant = mongoose.model("Applicant", applicantSchema);
export default Applicant;
