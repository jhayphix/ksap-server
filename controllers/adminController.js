import Admin from "../models/adminModel.js";
import {
  adminSchema,
  adminUpdateSchema,
} from "../validators/adminValidator.js";

// @desc    Get all admins
// @route   GET /api/admins
export const getAdmins = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);

    const admins =
      isNaN(limit) || limit <= 0
        ? await Admin.find().sort({ createdAt: -1 })
        : await Admin.find().sort({ createdAt: -1 }).limit(limit);

    res.status(200).json({ success: true, count: admins.length, data: admins });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single admin
// @route   GET /api/admins/:id
export const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      const error = new Error("Admin not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new admin
// @route   POST /api/admins
export const createAdmin = async (req, res, next) => {
  try {
    const validatedData = adminSchema.parse(req.body);
    const newAdmin = new Admin(validatedData);
    const savedAdmin = await newAdmin.save();

    res.status(201).json({ success: true, data: savedAdmin });
  } catch (error) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};

// @desc    Update admin
// @route   PUT /api/admins/:id
export const updateAdmin = async (req, res, next) => {
  try {
    const validatedData = adminUpdateSchema.parse(req.body);

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { ...validatedData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!admin) {
      const error = new Error("Admin not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};

// @desc    Delete admin
// @route   DELETE /api/admins/:id
export const deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      const error = new Error("Admin not found");
      error.status = 404;
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    next(error);
  }
};
