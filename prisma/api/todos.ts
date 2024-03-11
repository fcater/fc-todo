import { cache } from "react";
import prisma from "@/prisma/client";

const fetchTodo = cache((todoId: number) => {
  if (!todoId) return;
  return prisma.todo.findUnique({ where: { id: todoId } });
});

const fetchTodos = cache(() => prisma.todo.findMany({ include: { createdByUser: true } }));

const todoAPIs = {
  get: fetchTodo,
  list: fetchTodos,
};

export default todoAPIs;
