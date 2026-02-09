import multer from "multer";
import path from "path";
import fs from "fs";
import { JwtPayload } from "jsonwebtoken";

export interface CustomFile extends Express.Multer.File {
  documentType?: string;
  documentName?: string | null;
}



const storage = multer.diskStorage({
  destination(req, file, cb) {
    const user = req.user as JwtPayload;
    const userId = user?.id;
    if (!userId) return cb(new Error("User ID required"), "");

    let folder = "others";
    let type: string = "OTHER";

    if (file.fieldname === "avatar") {
      folder = "avatar";
      type = "AVATAR";
    } else if (file.fieldname === "resume") {
      folder = "resume";
      type = "RESUME";
    } else if (file.fieldname === "signature") {
      folder = "signature";
      type = "SIGNATURE";
    } else if (file.fieldname === "certificate") {
      const certificateName = req.body.certificateName || "certificate";
      const safeName = certificateName.toLowerCase().replace(/\s+/g, "-");

      folder = path.join("certificates", safeName);
      type = "CERTIFICATE";
    }

    const uploadPath = path.join("uploads", "users", userId, folder);
    fs.mkdirSync(uploadPath, { recursive: true });

    // attach metadata to file object for DB save
    const customFile = file as CustomFile;
    customFile.documentType = type;
    customFile.documentName = req.body.certificateName || null;

    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    if (file.fieldname === "certificate") {
      const safeName = (req.body.certificateName || "certificate")
        .toLowerCase()
        .replace(/\s+/g, "-");
      return cb(null, `${safeName}-${unique}${ext}`);
    }

    cb(null, `${unique}${ext}`);
  },
});




export const upload = multer({ storage });
