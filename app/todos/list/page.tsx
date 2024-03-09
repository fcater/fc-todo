import { Metadata } from "next";
import { Flex } from "@radix-ui/themes";

import TodoTable from "./TodoTable";
import TodoActions from "./TodoActions";

const TodosPage = () => {
  return (
    <Flex direction="column" gap="3">
      <TodoActions />
      <TodoTable />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FC Todo - Todo List",
  description: "View all Todos",
};

export default TodosPage;
