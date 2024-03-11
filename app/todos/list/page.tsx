import { Metadata } from "next";
import { Flex } from "@radix-ui/themes";

import TodoActions from "./TodoActions";
import TodoTable from "./TodoTable";

type TodosPageProps = {
  searchParams: {
    hasDone: String;
  };
};

const TodosPage = ({ searchParams }: TodosPageProps) => {
  return (
    <Flex direction="column" gap="3">
      <TodoActions />
      <TodoTable searchParams={searchParams} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FC Todo - Todo List",
  description: "View all Todos",
};

export default TodosPage;
