import express from "express";
// import db from "./database.js";
import cors from "cors";
import userRouter from "../route/api/user-route.js";
import authRouter from "../route/public-api/auth-route.js";
import employeeRouter from "../route/api/employee-route.js";
import errorMiddleware from "../middleware/error-middleware.js";

//SYNC DB
// (async () => {
//   await db.sync();
// })();

const web = express();
web
  .use(cors({ credentials: true, origin: "http://localhost:3000" }))
  .use(express.json())
  .use(authRouter)
  .use(userRouter)
  .use(employeeRouter)
  .use(errorMiddleware);

export default web;
