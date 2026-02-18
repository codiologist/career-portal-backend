import { prisma } from "../../config/prisma"


const deleteDocumentSingle = async (id: string) => {

   const result = await prisma.document.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });

  return result
    
}


export const UploadService = {
    deleteDocumentSingle
}