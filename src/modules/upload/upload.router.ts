/* eslint-disable @typescript-eslint/no-explicit-any */

import express from "express";
import { auth } from "../../middlewares/auth";
import { CustomFile, upload } from "../../utils/uploadFileSystem";
import { prisma } from "../../config/prisma";
import { JwtPayload } from "jsonwebtoken";




const router = express.Router();


////////// Upload //////////
router.post("/user/resume", auth("USER"), upload.single("resume"), async (req, res) => {

    const file = req.file  as CustomFile; // Cast to CustomFile to access custom properties
    const user = req.user as JwtPayload;

    console.log(file);
    if (!file) {    
        return res.status(400).json({ message: "No file uploaded" });
    }

    if (!file.documentType) {
        return res.status(400).json({ message: "Document type is required" });
    }

    console.log(file)


    const result = await prisma.document.create({
        data: {
            userId: user.id,
            type: file.documentType as any,          // CERTIFICATE
            name: file.documentName,          // SSC / HSC / Masters
            path: file.path,
            size: file.size,
            mimeType: file.mimetype,
        },
    });

    console.log(result)

    res.json({ message: "File uploaded successfully", file });
});


router.post("/user/avatar", auth("USER"), upload.single("avatar"), async (req, res) => {

    const file = req.file  as CustomFile; // Cast to CustomFile to access custom properties
    const user = req.user as JwtPayload;

    console.log(file);
    if (!file) {    
        return res.status(400).json({ message: "No file uploaded" });
    }

    if (!file.documentType) {
        return res.status(400).json({ message: "Document type is required" });
    }

    console.log(file)


    const result = await prisma.document.create({
        data: {
            userId: user.id,
            type: file.documentType as any,          // CERTIFICATE
            name: file.documentName,          // SSC / HSC / Masters
            path: file.path,
            size: file.size,
            mimeType: file.mimetype,
        },
    });

    console.log(result)

    res.json({ message: "File uploaded successfully", file });
});


router.post("/user/signature", auth("USER"), upload.single("signature"), async (req, res) => {

    const file = req.file  as CustomFile; // Cast to CustomFile to access custom properties
    const user = req.user as JwtPayload;

    console.log(file);
    if (!file) {    
        return res.status(400).json({ message: "No file uploaded" });
    }

    if (!file.documentType) {
        return res.status(400).json({ message: "Document type is required" });
    }

    console.log(file)


    const result = await prisma.document.create({
        data: {
            userId: user.id,
            type: file.documentType as any,          // CERTIFICATE
            name: file.documentName,          // SSC / HSC / Masters
            path: file.path,
            size: file.size,
            mimeType: file.mimetype,
        },
    });

    console.log(result)

    res.json({ message: "File uploaded successfully", file });
});

////////// Upload //////////


export const UploadRouter = router;