import mongoose from "mongoose";

const guardianDetailsSchema = new mongoose.Schema({
  guardianName: { type: String },
  guardianPhone: { type: String },
  guardianLocation: { type: String },
  guardianOccupation: { type: String },
  guardianRelationship: { type: String },
});

const applicantSchema = new mongoose.Schema({
  uid: { type: String },
  externalId: { type: String, required: true },
  role: { type: String, default: "Applicant" },
  fullName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  otherNames: { type: String },
  gender: { type: String, required: true },
  nationality: { type: String },
  dateOfBirth: { type: Date, required: true },
  age: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  telecelNumber: { type: String },
  email: { type: String, required: true },
  authEmail: { type: String },
  authPhoneNumber: { type: String },
  authPhotoURL: { type: String },
  authDisplayName: { type: String },
  indexNumber: { type: String, required: true },
  referenceNumber: { type: String, required: true },
  college: { type: String },
  faculty: { type: String },
  department: { type: String },
  programmeOfStudy: { type: String, required: true },
  durationOfProgramme: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  educationalLevel: { type: String, required: true },
  modeOfAdmission: { type: String, required: true },
  guardianDetails: guardianDetailsSchema,
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
