import { Metadata } from "next";
import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";

import TodoSummary from "./TodoSummary";
import LatestTodos from "./LatestTodos";
import TodoChart from "./TodoChart";

export default async function Home() {
  const doneTodosCount = await prisma.todo.count({ where: { hasDone: true } });
  const notDoneTodosCount = await prisma.todo.count({ where: { hasDone: false } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <TodoSummary doneTodosCount={doneTodosCount} notDoneTodosCount={notDoneTodosCount} />
        <TodoChart doneTodosCount={doneTodosCount} notDoneTodosCount={notDoneTodosCount} />
      </Flex>
      <LatestTodos />
    </Grid>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fc Todo - Dashboard",
  description: "View a summary of todos",
};
