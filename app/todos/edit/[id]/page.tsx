import React from "react";
import dynamic from "next/dynamic";
import todoAPIs from "@/prisma/api/todos";
import { notFound } from "next/navigation";

import TodoFormSkeleton from "./loading";

const TodoForm = dynamic(() => import("@/app/todos/_components/TodoForm"), {
  ssr: false,
  loading: () => <TodoFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditTodoPage = async ({ params }: Props) => {
  const todo = await todoAPIs.get(parseInt(params.id));

  if (!todo) notFound();

  return <TodoForm todo={todo} />;
};

export async function generateMetadata({ params }: Props) {
  const todo = await todoAPIs.get(Number.parseInt(params.id));

  return {
    title: todo?.title,
    description: "Edit page of todo " + todo?.id,
  };
}

export default EditTodoPage;
