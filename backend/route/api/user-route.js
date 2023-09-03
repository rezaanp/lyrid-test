import express from "express";
import authMiddleware from "../../middleware/auth-middleware.js";
import userController from "../../controller.js/user-controller.js";

const userRouter = new express.Router();

userRouter
  .route("/users")
  .get(authMiddleware, userController.get)
  .post(authMiddleware, userController.create);

userRouter
  .route("/users/:userId")
  .get(authMiddleware, userController.getById)
  .patch(authMiddleware, userController.update)
  .delete(authMiddleware, userController.remove);

export default userRouter;
