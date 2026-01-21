import { prisma } from "../../config/prisma"
import { AppError } from "../../utils/AppError"
import { createSlug } from "../../utils/createSlug"
import { generateJobId } from "../../utils/generateJobId"
import { TJobCategoryInput, TJobCreateInput } from "./job.validation"




const createJob = async (payload: TJobCreateInput) => {

  const id = await generateJobId()
  if (id) {
    payload.jobUniqueId = id
  } else {
    throw new AppError(500, "Id not found")
  }
  const result = await prisma.job.create({
    data: {
      ...payload,
      slug: createSlug(payload.title)
    }
  })
  return result
}



const getAllJobs = async () => {

  const result = prisma.job.findMany()

  return result
}





//////categori ///////

const createCategory = async (payload: TJobCategoryInput) => {

  console.log(payload)
  const result = await prisma.jobCategory.create({
    data: {
      title: payload.title,
      desc: payload.desc
    }
  })
  return result

}


const getJobById = async (id: string) => {

  const result = await prisma.job.findUnique({
    where: {id}
  })
  return result
}




const getAllCategory = async () => {

  const result = await prisma.jobCategory.findMany({
    select: {
      title: true,
      desc: true
    }
  })
  return result

}


export const JobService = {
  createJob,
  getAllJobs,
  createCategory,
  getAllCategory, 
  getJobById
}
