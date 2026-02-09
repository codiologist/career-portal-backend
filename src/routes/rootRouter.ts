import express from "express";
import { Authrouter } from "../modules/auth/auth.router";
// import { Jobrouter } from "../modules/job/job.router";
import { UserRouter } from "../modules/user/user.router";
import { UploadRouter } from "../modules/upload/upload.router";




const router = express.Router();


const appRoutes = [
    {
        path: "/auth",
        route: Authrouter,
    },
    {
        path: "/user",
        route: UserRouter,
    },
     {
        path: "/upload",
        route: UploadRouter,
    },
]

appRoutes.forEach((route) => {router.use(route.path, route.route)});




export const RootRouter = router;