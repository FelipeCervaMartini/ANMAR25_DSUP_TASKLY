import { Router, Request, Response } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
const controller = new TaskController();

router.post("/tasks", (req: Request, res: Response) => {
  controller.create(req, res);
});
router.get("/tasks", (req: Request, res: Response) => {
  controller.getAll(req, res);
});

export default router;
