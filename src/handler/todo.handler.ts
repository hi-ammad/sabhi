import { Todo } from "@/model";
import * as handleFactory from "./handler.factory.ts";
import { createTodoSchema, updateTodoSchema } from "@/validation/";
import { requireOwnership } from "@/library/app_error";
import { rateLimitByUser } from "@/library/rate_limiter";

// Example: limit each user to create 10 todos per minute
const createTodoRateLimit = rateLimitByUser("createTodo", 10, 60);

export const createTodo = handleFactory.createOne(Todo, {
  schema: createTodoSchema,
  rateLimits: [createTodoRateLimit],
});

export const getTodo = handleFactory.getOne(Todo);
export const getAllTodos = handleFactory.getAll(Todo);

export const updateTodo = handleFactory.updateOne(Todo, {
  permissions: [
    requireOwnership(async (req) => {
      const todo = await Todo.findById(req.params.id);
      return todo?.user.toString() ?? null;
    }),
  ],
  schema: updateTodoSchema,
});

export const deleteTodo = handleFactory.deleteOne(Todo, {
  permissions: [
    requireOwnership(async (req) => {
      const todo = await Todo.findById(req.params.id);
      return todo?.user.toString() ?? null;
    }),
  ],
});
