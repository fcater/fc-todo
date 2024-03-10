import React from "react";
import Link from "next/link";
import NextLink from "next/link";
import { Table } from "@radix-ui/themes";
import { Badge } from "@/app/components";
import type { Todo } from "@prisma/client";
import CheckTodo from "./CheckTodo";

const TodoTable = async ({ todos }: { todos: Todo[] }) => {
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
              <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
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
