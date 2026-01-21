

import { catchAsync } from "../../utils/catchAsync"
import { JobService } from "./job.service"
import { jobCategorySchema, JobSchema } from "./job.validation"



const createJob = catchAsync(async (req, res) => {
const validatedData = JobSchema.parse(req.body);

    const result = await JobService.createJob(validatedData)

    res.status(201).json({
        status: "success",
        message: "Job created successfully",
        statusCode: 201,
        data: result
    })
})



const getAllJobs = catchAsync(async (req, res) => {

    const result = await JobService.getAllJobs()

    res.status(200).json({
        status: "success",
        message: "Jobs Retrive reuccessfully",
        statusCode: 200,
        data: result
    })
})



const getJobById = catchAsync(async (req, res) => {

    const id = req.params.id;


    const result = await JobService.getJobById(id as string)
    res.status(200).json({
        status: "success",
        message: "Jobs Retrive reuccessfully",
        statusCode: 200,
        data: result
    })
})







const createCategory = catchAsync(async (req, res) => {
    const validatedData = jobCategorySchema.parse(req.body);

    const result = await JobService.createCategory(validatedData)

    res.status(201).json({
        status: "success",
        message: "Job created successfully",
        statusCode: 201,
        data: result
    })
})



const getAllCategory = catchAsync(async (req, res) => {

    const result = await JobService.getAllCategory()
    res.status(200).json({
        status: "success",
        message: "Retrive All Category sSuccessfully",
        statusCode: 200,
        data: result
    })
})



export const JobController = {
    createJob,
    getAllJobs,
    createCategory, 
    getAllCategory, 
    getJobById
}



