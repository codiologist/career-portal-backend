
import { catchAsync } from "../../utils/catchAsync";
import { UploadService } from "./upload.service";
import { TUserPayload } from "../../types/user";
import { TCustomFileMulter } from "../../utils/uploadFileSystem";
import { DocumentValidation } from "./upload.validation";



const uploadAvater = catchAsync(async (req, res) => {
  const file = req.file as TCustomFileMulter; // Cast to CustomFile to access custom properties
  const user = req.user as TUserPayload;
  const result = await UploadService.uploadAvater(file, user)

  res.status(201).json({
    status: true,
    message: 'Avater upload successfully',
    data: result,
  });
})


const uploadResume = catchAsync(async (req, res) => {
  const file = req.file as TCustomFileMulter; // Cast to CustomFile to access custom properties
  const user = req.user as TUserPayload;
  const result = await UploadService.uploadResume(file, user)

  res.status(201).json({
    status: true,
    message: 'Resume upload successfully',
    data: result,
  });
})


const uploadSignature = catchAsync(async (req, res) => {
  const file = req.file as TCustomFileMulter; // Cast to CustomFile to access custom properties
  const user = req.user as TUserPayload;
  const result = await UploadService.uploadSignature(file, user)

  res.status(201).json({
    status: true,
    message: 'Signature upload successfully',
    data: result,
  });
})



const uploadDocument = catchAsync(async (req, res) => {
  const file = req.file as TCustomFileMulter; // Cast to CustomFile to access custom properties
  const user = req.user as TUserPayload;
  const validateData = DocumentValidation.createDocumentSchema.parse(JSON.parse(req.body.data));

  const result = await UploadService.uploadSDocument(file, user, validateData)

  res.status(201).json({
    status: true,
    message: 'Document upload successfully',
    data: result,
  });
})




const deleteDocumentSingle = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UploadService.deleteDocumentSingle(id)
  res.status(201).json({
    status: true,
    message: 'Document delete successfully',
    data: result,
  });
})




export const UploadController = {
  uploadAvater,
  uploadResume,
  uploadSignature,
  deleteDocumentSingle,
  uploadDocument
}