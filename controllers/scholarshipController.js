import Scholarship from "../models/scholarshipModel.js";
import {
  scholarshipSchema,
  scholarshipUpdateSchema,
} from "../validators/scholarshipValidator.js";

// @desc   Get all scholarships
// @route  GET /api/scholarships
export const getScholarships = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);

    const scholarships =
      isNaN(limit) || limit <= 0
        ? await Scholarship.find().sort({ createdAt: -1 })
        : await Scholarship.find().sort({ createdAt: -1 }).limit(limit);

    res
      .status(200)
      .json({ success: true, count: scholarships.length, data: scholarships });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single scholarship
// @route   GET /api/scholarships/:id
export const getScholarship = async (req, res, next) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    if (!scholarship) {
      const error = new Error("Scholarship not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: scholarship });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new scholarship
// @route   POST /api/scholarships
export const createScholarship = async (req, res, next) => {
  try {
    const validatedData = scholarshipSchema.parse(req.body);
    const newScholarship = new Scholarship(validatedData);
    const savedScholarship = await newScholarship.save();
    res.status(201).json({ success: true, data: savedScholarship });
  } catch (error) {
    next(error);
  }
};

// @desc    Update scholarship
// @route   PUT /api/scholarships/:id
export const updateScholarship = async (req, res, next) => {
  try {
    const validatedData = scholarshipUpdateSchema.parse(req.body);
    validatedData.updatedAt = Date.now();
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!scholarship) {
      const error = new Error("Scholarship not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: scholarship });
  } catch (error) {
    next(error);
  }
};




// @desc    Delete scholarship
// @route   DELETE /api/scholarships/:id
export const deleteScholarship = async (req, res, next) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);

    if (!scholarship) {
      const error = new Error("Scholarship not found");
      error.status = 404;
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: "Scholarship deleted successfully" });
  } catch (error) {
    next(error);
  }
};
