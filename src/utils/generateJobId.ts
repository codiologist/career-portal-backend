import e from "express";
import { prisma } from "../config/prisma";


export async function generateJobId(): Promise<string> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const datePrefix = `${year}_${month}_${day}`;

  // Find the last job ID for today
  const lastJob = await prisma.job.findFirst({
    orderBy: {
      createdAt: "desc", // or updatedAt if you have createdAt
    },
  });

  let newIndex = 1; // default if no previous job today

  console.log(lastJob)

  if (lastJob) {
    // extract the number from last job ID
    const parts = lastJob.jobUniqueId.split("_");
    const lastIndex = parseInt(parts[parts.length - 1], 10);
    newIndex = lastIndex + 1;
  } else {
    newIndex = 1;
  }

  const indexStr = String(newIndex).padStart(3, "0");
  const newJobId = `JOB_ID_${datePrefix}_${indexStr}`;

  return newJobId;
}
