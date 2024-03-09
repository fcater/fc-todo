import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TodoActions = () => {
  return (
    <Flex justify="between">
      <Button>
        <Link href="/todos/new">添加</Link>
      </Button>
    </Flex>
  );
};

export default TodoActions;