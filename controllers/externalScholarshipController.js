import ExternalScholarship from "../models/externalScholarshipModel.js";
import { externalScholarshipSchema } from "../validators/externalScholarshipValidator.js";

// @desc   Get all external scholarships
// @route  GET /api/external-scholarships
export const getExternalScholarships = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);

    const scholarships =
      isNaN(limit) || limit <= 0
        ? await ExternalScholarship.find().sort({ createdAt: -1 })
        : await ExternalScholarship.find().sort({ createdAt: -1 }).limit(limit);

    res
      .status(200)
      .json({ success: true, count: scholarships.length, data: scholarships });
  } catch (error) {
    next(error);
  }
};

// @desc   Get single external scholarship
// @route  GET /api/external-scholarships/:id
export const getExternalScholarship = async (req, res, next) => {
  try {
    const scholarship = await ExternalScholarship.findById(req.params.id);

    if (!scholarship) {
      const error = new Error("External scholarship not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: scholarship });
  } catch (error) {
    next(error);
  }
};

// @desc   Create new external scholarship
// @route  POST /api/external-scholarships
export const createExternalScholarship = async (req, res, next) => {
  try {
    const validatedData = externalScholarshipSchema.parse(req.body);

    const newScholarship = new ExternalScholarship(validatedData);
    const savedScholarship = await newScholarship.save();

    res.status(201).json({ success: true, data: savedScholarship });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};

// @desc   Update external scholarship
// @route  PUT /api/external-scholarships/:id
export const updateExternalScholarship = async (req, res, next) => {
  try {
    const validatedData = externalScholarshipSchema.parse(req.body);

    const scholarship = await ExternalScholarship.findByIdAndUpdate(
      req.params.id,
      { ...validatedData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!scholarship) {
      const error = new Error("External scholarship not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: scholarship });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};


// @desc   Delete external scholarship
// @route  DELETE /api/external-scholarships/:id
export const deleteExternalScholarship = async (req, res, next) => {
  try {
    const scholarship = await ExternalScholarship.findByIdAndDelete(
      req.params.id
    );

    if (!scholarship) {
      const error = new Error("External scholarship not found");
      error.status = 404;
      return next(error);
    }

    res
      .status(200)
      .json({
        success: true,
        message: "External scholarship deleted successfully",
      });
  } catch (error) {
    next(error);
  }
};
