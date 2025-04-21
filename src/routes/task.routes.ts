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
router.get("/tasks/:id", (req: Request, res: Response) => {
  controller.getById(req, res);
});
router.delete("/tasks/:id", (req: Request, res: Response) => {
  controller.delete(req, res);
});
router.put("/tasks/:id", (req: Request, res: Response) => {
  controller.update(req, res);
});

export default router;
