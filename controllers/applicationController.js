import Application from "../models/applicationModel.js";
import { applicationSchema } from "../validators/applicationValidator.js";

// @desc   Get all applications
// @route  GET /api/applications
export const getApplications = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);

    const applications =
      isNaN(limit) || limit <= 0
        ? await Application.find().sort({ createdAt: -1 })
        : await Application.find().sort({ createdAt: -1 }).limit(limit);

    res
      .status(200)
      .json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
export const getApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      const error = new Error("Application not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new application
// @route   POST /api/applications
export const createApplication = async (req, res, next) => {
  try {
    const validatedData = applicationSchema.parse(req.body);

    const newApplication = new Application(req.body);
    const savedApplication = await newApplication.save();
    res.status(201).json({ success: true, data: savedApplication });
  } catch (error) {
    if (error.name === "ZodError") {
      console.error("Zod validation errors:", error.errors);
      return res.status(400).json({ success: false, errors: error.errors });
    }
    console.log("Error: ", error);
    next(error);
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
export const updateApplication = async (req, res, next) => {
  try {
    const validatedData = applicationSchema.parse(req.body);

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { ...validatedData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!application) {
      const error = new Error("Application not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      const error = new Error("Application not found");
      error.status = 404;
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    next(error);
  }
};
