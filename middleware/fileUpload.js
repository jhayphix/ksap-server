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
    const { scholarshipId, applicantId, id, sectionId, questionId } = req.body;

    const uploadPath = path.join(
      "public",
      "uploads",
      "scholarships",
      scholarshipId,
      applicantId,
      id,
      sectionId,
      questionId
    );

    ensureDirExists(uploadPath);
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeName = baseName.replace(/\s+/g, "_").toLowerCase();

    cb(null, `${safeName}_${timestamp}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
