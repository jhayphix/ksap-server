import Applicant from "../models/applicantModel.js";
import {
  applicantSchema,
  applicantUpdateSchema,
} from "../validators/applicantValidator.js";

// @desc    Get all applicants
// @route   GET /api/applicants
export const getApplicants = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);

    const applicants =
      isNaN(limit) || limit <= 0
        ? await Applicant.find().sort({ createdAt: -1 })
        : await Applicant.find().sort({ createdAt: -1 }).limit(limit);

    res
      .status(200)
      .json({ success: true, count: applicants.length, data: applicants });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single applicant
// @route   GET /api/applicants/:id
export const getApplicant = async (req, res, next) => {
  try {
    const applicant = await Applicant.findById(req.params.id);

    if (!applicant) {
      const error = new Error("Applicant not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: applicant });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new applicant
// @route   POST /api/applicants
export const createApplicant = async (req, res, next) => {
  try {
    const validatedData = applicantSchema.parse(req.body);
    const newApplicant = new Applicant(validatedData);
    const savedApplicant = await newApplicant.save();

    res.status(201).json({ success: true, data: savedApplicant });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};

// @desc    Update applicant
// @route   PUT /api/applicants/:id
export const updateApplicant = async (req, res, next) => {
  try {
    const validatedData = applicantUpdateSchema.parse(req.body);

    const applicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { ...validatedData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!applicant) {
      const error = new Error("Applicant not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: applicant });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};

// @desc    Delete applicant
// @route   DELETE /api/applicants/:id
export const deleteApplicant = async (req, res, next) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);

    if (!applicant) {
      const error = new Error("Applicant not found");
      error.status = 404;
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: "Applicant deleted successfully" });
  } catch (error) {
    next(error);
  }
};
