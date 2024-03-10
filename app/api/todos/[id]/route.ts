import prisma from "@/prisma/client";
import { patchTodoSchema } from "@/app/todos/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const validation = patchTodoSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {  status: 400, });

  const {  title, description,priority } = body;

  const todo = await prisma.todo.findUnique({ where: { id: parseInt(params.id) },});
  if (!todo) return NextResponse.json({ error: "Invalid Todo" }, { status: 404 });
  const updatedTodo = await prisma.todo.update({
    where: { id: todo.id },
    data: { title, description,  priority,  },
  });

  return NextResponse.json(updatedTodo);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const todo = await prisma.todo.findUnique({ where: { id: parseInt(params.id) }, });
  if (!todo) return NextResponse.json({ error: "Invalid Todo" }, { status: 404 });

  await prisma.todo.delete({  where: { id: todo.id },  });

  return NextResponse.json({});
}
