import { cache } from "react";
import prisma from "@/prisma/client";

const fetchTodo = cache((todoId: number) => prisma.todo.findUnique({ where: { id: todoId } }));
const fetchTodos = cache(() => prisma.todo.findMany());

const todoAPIs = {
  get: fetchTodo,
  list: fetchTodos,
};

export default todoAPIs;
