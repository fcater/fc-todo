import React from "react";
import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { RocketIcon } from "@radix-ui/react-icons";

const TodoActions = () => {
  return (
    <Flex justify="start" gap="5">
      <Button>
        <RocketIcon />
        <Link href="/todos/new">添加</Link>
      </Button>
    </Flex>
  );
};

export default TodoActions;
