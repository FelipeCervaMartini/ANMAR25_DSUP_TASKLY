import { Router, Request, Response } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
const controller = new TaskController();

router.post("/tasks", (req: Request, res: Response) => {
  controller.create(req, res);
});

export default router;
