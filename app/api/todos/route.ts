import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { todoSchema } from "@/app/todos/validationSchemas";

export async function GET(request: NextRequest) {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = todoSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  const { createdByUserId } = body;

  if (createdByUserId) {
    const user = await prisma.user.findUnique({ where: { id: createdByUserId } });
    if (!user) return NextResponse.json({ error: "用户不存在." }, { status: 400 });
  }

  const newTodo = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description,
      priority: body.priority,
      createdByUserId: body.createdByUserId,
    },
  });

  return NextResponse.json(newTodo, { status: 201 });
}
