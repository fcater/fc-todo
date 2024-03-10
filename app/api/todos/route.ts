import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { todoSchema } from "@/app/todos/validationSchemas";

export async function GET(request: NextRequest) {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = todoSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  const newTodo = await prisma.todo.create({
    data: { title: body.title, description: body.description, priority: body.priority },
  });

  return NextResponse.json(newTodo, { status: 201 });
}
