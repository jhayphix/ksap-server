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

// @desc    Upload a single file as part of a response
// @route   POST /api/applications/upload
export const uploadApplicationFiles = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/scholarships/${req.body.scholarshipId}/${req.body.applicantId}/${
      req.body.id
    }/${req.body.sectionId}/${req.body.questionId}/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        path: req.file.path,
        url: fileUrl,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    next(error);
    throw error;
  }
};

// @desc    Create new application
// @route   POST /api/applications
export const createApplication = async (req, res, next) => {
  try {
    await uploadApplicationFiles(req, res, next);
    // Parse fields that are JSON strings due to FormData
    if (typeof req.body.responseSections === "string") {
      req.body.responseSections = JSON.parse(req.body.responseSections);
    }

    if (typeof req.body.progress === "string") {
      req.body.progress = JSON.parse(req.body.progress);
    }

    // Run Zod validation
    // const validatedData = applicationSchema.parse(req.body);

    // If there are files, insert file URLs into responses
    if (req.files && validatedData.responseSections) {
      validatedData.responseSections = validatedData.responseSections.map(
        (section) => {
          const updatedResponses = section.responses.map((response) => {
            const questionId = response.questionId;
            const uploadedFile = req.files?.[questionId]?.[0];

            if (uploadedFile) {
              const filePath = uploadedFile.path.replace("public/", "");
              const fileUrl = `${req.protocol}://${req.get(
                "host"
              )}/${filePath}`;
              return {
                ...response,
                response: fileUrl, // Ensure this matches the original schema field
              };
            }

            return response;
          });

          return {
            ...section,
            responses: updatedResponses,
          };
        }
      );
    }

    // Save to DB
    const newApplication = new Application(validatedData);
    console.log("newApplication: ", newApplication);
    const savedApplication = await newApplication.save();

    res.status(201).json({ success: true, data: savedApplication });
  } catch (error) {
    if (error.name === "ZodError") {
      console.error("Zod validation errors:", error.errors);
      return res.status(400).json({ success: false, errors: error.errors });
    }
    console.error("Error:", error);
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
