import { Metadata } from "next";
import { Flex } from "@radix-ui/themes";

import todoAPIs from "@/prisma/api/todos";
import TodoTable from "../list/TodoTable";
import TodoActions from "../list/TodoActions";

const DoneTodosPage = async () => {
  const todos = await todoAPIs.list();

  return (
    <Flex direction="column" gap="3">
      <TodoActions />
      <TodoTable todos={todos.filter((todo) => todo.hasDone)} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FC Todo - Done Todo List",
  description: "View all done todos",
};

export default DoneTodosPage;
