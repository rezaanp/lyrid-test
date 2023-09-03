import express from "express";
import authController from "../../controller.js/auth-controller.js";

const authRouter = new express.Router();
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;
