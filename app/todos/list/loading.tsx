import { Skeleton } from "@/app/components";
import { Table } from "@radix-ui/themes";
import TodoActions from "./TodoActions";

const LoadingTodosPage = () => {
  const todos = [1, 2, 3, 4, 5];

  return (
    <div>
      <TodoActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>标题</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">优先级</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">创建时间</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos.map((todo) => (
            <Table.Row key={todo}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingTodosPage;
