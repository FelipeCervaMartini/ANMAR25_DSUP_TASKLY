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
router.get("/notes/:id", (req: Request, res: Response) => {
  controller.getById(req, res);
});
router.put("/notes/:id", (req: Request, res: Response) => {
  controller.update(req, res);
});
router.delete("/notes/:id", (req: Request, res: Response) => {
  controller.delete(req, res);
});
export default router;
