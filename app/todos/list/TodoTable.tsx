import React from "react";
import Link from "next/link";
import NextLink from "next/link";
import { Badge } from "@/app/components";
import todoAPIs from "@/prisma/api/todos";
import type { Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Avatar, Table } from "@radix-ui/themes";

import CheckTodo from "./CheckTodo";

type TodoTableProps = {
  searchParams: {
    hasDone: String;
  };
};

const TodoTable = async ({ searchParams }: TodoTableProps) => {
  const session = await getServerSession();
  let todos;
  const _todos = await todoAPIs.list();
  if (searchParams.hasDone) {
    const allTodos = _todos.reduce<{ done: typeof _todos; notDone: typeof _todos }>(
      (total, cur) => {
        if (cur.hasDone) total.done.push(cur);
        else total.notDone.push(cur);
        return total;
      },
      { done: [], notDone: [] }
    );

    todos = searchParams.hasDone === "true" ? allTodos.done : allTodos.notDone;
  } else todos = _todos;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <NextLink href="">{column.label}</NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {todos?.map((todo) => (
          <Table.Row key={todo.id}>
            <Table.Cell>
              <Link href={`/todos/${todo.id}`}>
                {todo.createdByUser?.image && session && (
                  <Avatar
                    src={todo.createdByUser?.image}
                    fallback="?"
                    size="1"
                    radius="full"
                    className="mr-2"
                    referrerPolicy="no-referrer"
                  />
                )}
                {todo.title}
              </Link>
              <div className="inline md:hidden ml-3">
                <Badge.Priority priority={todo.priority} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Badge.Priority priority={todo.priority} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">{todo.createdAt.toDateString()}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">{todo.hasDone ? "已完成" : "未完成"}</Table.Cell>
            <CheckTodo todo={todo} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Todo;
  className?: string;
}[] = [
  { label: "标题", value: "title" },
  {
    label: "优先级",
    value: "priority",
    className: "hidden md:table-cell",
  },
  {
    label: "创建时间",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
  {
    label: "状态",
    value: "hasDone",
    className: "hidden md:table-cell",
  },
  {
    label: " ",
    value: "hasDone",
  },
];

export const columnNames = columns.map((column) => column.value);

export default TodoTable;
