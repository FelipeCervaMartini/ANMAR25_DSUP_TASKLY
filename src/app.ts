import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import noteRoutes from "./routes/note.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api", noteRoutes);
app.get("/", (req, res) => {
  res.send("Task Notes API is running");
});

export default app;
