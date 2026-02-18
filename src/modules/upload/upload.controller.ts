import { prisma } from "../../config/prisma";
import { catchAsync } from "../../utils/catchAsync";
import { UploadService } from "./upload.service";

const deleteDocumentSingle = catchAsync (async (req, res) => {


    const {id} = req.params

    const result = await UploadService.deleteDocumentSingle(id)

      res.status(201).json({
        status: true,
        message: 'Document delete successfully',
        data: {},
      });

})


export const UploadController = {
    deleteDocumentSingle
}