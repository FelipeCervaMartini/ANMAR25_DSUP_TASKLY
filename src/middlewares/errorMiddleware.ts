import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("Error Handler:", err);

  if (err.type === "validation") {
    res.status(400).json({
      error: "Validation Error",
      details: err.details,
    });
    return;
  }

  if (err.type === "not_found") {
    res.status(404).json({
      error: "Resource Not Found",
    });
    return;
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
}
