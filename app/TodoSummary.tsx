import React from "react";
import Link from "next/link";
import { Card, Flex, Text } from "@radix-ui/themes";

interface Props {
  doneTodosCount: number;
  notDoneTodosCount: number;
}

const TodoSummary = ({ doneTodosCount, notDoneTodosCount }: Props) => {
  const status: {
    label: string;
    value: number;
    hasDone: String;
  }[] = [
    { label: "进行中", value: notDoneTodosCount, hasDone: "false" },
    { label: "已完成", value: doneTodosCount, hasDone: "true" },
  ];

  const priority: {
    label: string;
    value: number;
    hasDone: String;
  }[] = [
    { label: "已完成", value: doneTodosCount, hasDone: "true" },
    { label: "进行中", value: notDoneTodosCount, hasDone: "false" },
  ];

  return (
    <Flex gap="4">
      {status.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link className="text-sm font-medium" href={`/todos/list?hasDone=${container.hasDone}`}>
              {container.label}
            </Link>
            <Text size="5" className="font-bold text-center">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default TodoSummary;
