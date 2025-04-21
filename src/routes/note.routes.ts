import { Router, Request, Response } from "express";
import { NoteController } from "../controllers/NoteController";

const router = Router();
const controller = new NoteController();

router.post("/tasks/:taskId/notes", (req: Request, res: Response) => {
  controller.create(req, res);
});

router.get("/tasks/:taskId/notes", (req: Request, res: Response) => {
  controller.getAllByTaskId(req, res);
});

export default router;
