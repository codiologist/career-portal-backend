import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed for avatar"));
      }
    } else if (file.fieldname === "resume") {
      if (file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDF files are allowed for resume"));
      }
    }
    cb(null, true);
  },
});
export default upload;