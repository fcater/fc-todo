import { Todo } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Badge } from "@/app/components";

const TodoDetails = ({ todo }: { todo: Todo }) => {
  return (
    <>
      <Heading>{todo.title}</Heading>
      <Flex className="space-x-3" my="2">
        <Badge.Priority priority={todo.priority} />
        <Text>{todo.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{todo.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TodoDetails;
