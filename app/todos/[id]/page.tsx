 import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import TodoDetails from "./TodoDetails";
import todoAPIs from "@/prisma/api/todos";
import EditTodoButton from "./EditTodoButton";
import DeleteTodoButton from "./DeleteTodoButton";

interface Props {
  params: { id: string };
}

const TodoDetailPage = async ({ params }: Props) => {
  const todo = await todoAPIs.get(Number.parseInt(params.id))
  if (!todo) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <TodoDetails todo={todo} />
      </Box>
      {(
        <Box>
          <Flex direction="column" gap="4">
            <EditTodoButton todoId={todo.id} />
            <DeleteTodoButton todoId={todo.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const todo = await todoAPIs.get(Number.parseInt(params.id));

  return {
    title: todo?.title,
    description: "Details of todo " + todo?.id,
  };
}

export default TodoDetailPage;
