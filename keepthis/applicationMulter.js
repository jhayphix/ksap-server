import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure directory exists
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const { scholarshipId, applicantId, externalId, sectionId, questionId } =
        req.body;

      // Ensure all required fields exist
      if (
        !scholarshipId ||
        !applicantId ||
        !externalId ||
        !sectionId ||
        !questionId
      ) {
        throw new Error("Missing required upload path parameters.");
      }

      const uploadPath = path.join(
        "public",
        "uploads",
        "scholarships",
        scholarshipId.toString(),
        applicantId.toString(),
        externalId.toString(),
        sectionId.toString(),
        questionId.toString()
      );

      ensureDirExists(uploadPath);
      cb(null, uploadPath);
    } catch (err) {
      cb(err);
    }
  },

  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeName = baseName.replace(/\s+/g, "_").toLowerCase();

    return cb(null, `${safeName}_${timestamp}${ext}`);
  },
});

const applicationUpload = multer({ storage });

export default applicationUpload;
