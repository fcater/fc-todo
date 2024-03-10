import { Metadata } from "next";
import { Flex } from "@radix-ui/themes";

import TodoActions from "./TodoActions";
import todoAPIs from "@/prisma/api/todos";
import TodoTable from "./TodoTable";

const TodosPage = async () => {
  const todos = await todoAPIs.list();

  return (
    <Flex direction="column" gap="3">
      <TodoActions />
      <TodoTable todos={todos.filter((todo) => !todo.hasDone)} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FC Todo - Todo List",
  description: "View all Todos",
};

export default TodosPage;
