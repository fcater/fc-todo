import React from "react";
import Link from "next/link";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";

import { Badge } from "./components";

const LatestTodos = async () => {
  const session = await getServerSession();
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { createdByUser: true },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        最近添加
      </Heading>
      <Table.Root>
        <Table.Body>
          {todos.map((todo: any) => (
            <Table.Row key={todo.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex align="start" gap="2">
                    <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
                    <Badge.Priority priority={todo.priority} />
                  </Flex>
                  {todo.createdByUser && session && (
                    <Avatar src={todo.createdByUser.image!} fallback="?" size="2" radius="full" />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestTodos;
