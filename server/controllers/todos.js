import express from "express";
import mongoose from "mongoose";

import TodoMessage from "../models/todoMessage.js";

const router = express.Router();

export const getTodos = async (req, res) => {
  try {
    const todoMessage = await TodoMessage.find();

    res.status(200).json(todoMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await TodoMessage.findById(id);

    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  const todo = req.body;
  console.log(todo);
  const newTodoMessage = new TodoMessage(todo);

  try {
    await newTodoMessage.save();

    res.status(201).json(newTodoMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, message } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No todo with id: ${id}`);

  const updateTodo = { title, message };

  await TodoMessage.findByIdAndUpdate(id, updateTodo, { new: true });

  res.json(updateTodo);
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No todo with id: ${id}`);

  await TodoMessage.findByIdAndRemove(id);

  res.json({ message: "Todo deleted with successfully." });
};

export const likeTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No todo with id: ${id}`);

  const todo = await TodoMessage.findById(id);

  const updateTodo = await TodoMessage.findByIdAndUpdate(
    id,
    { likeCount: todo.likeCount + 1 },
    { new: true }
  );

  res.json(updateTodo);
};

export const checkTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No todo with id: ${id}`);

  const todo = await TodoMessage.findById(id);

  const updateTodo = await TodoMessage.findByIdAndUpdate(
    id,
    { check: !todo.check },
    { new: true }
  );

  res.json(updateTodo);
};

export default router;
