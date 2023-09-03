import express from "express";
import authMiddleware from "../../middleware/auth-middleware.js";
import employeeController from "../../controller.js/employee-controller.js";

const employeeRouter = new express.Router();

employeeRouter
  .route("/employees")
  .get(authMiddleware, employeeController.get)
  .post(authMiddleware, employeeController.create);

employeeRouter
  .route("/employees/:employeeId")
  .get(authMiddleware, employeeController.getById)
  .patch(authMiddleware, employeeController.update)
  .delete(authMiddleware, employeeController.remove);

export default employeeRouter;
