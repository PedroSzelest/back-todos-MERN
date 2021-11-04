import express from "express";

import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  likeTodo,
  checkTodo,
} from "../controllers/todos.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.get("/:id", getTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/likeTodo", likeTodo);
router.patch("/:id/checkTodo", checkTodo);

export default router;
