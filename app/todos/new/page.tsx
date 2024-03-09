import dynamic from "next/dynamic";
import TodoFormSkeleton from "./loading";

const TodoForm = dynamic(() => import("@/app/todos/_components/TodoForm"), {
  ssr: false,
  loading: () => <TodoFormSkeleton />,
});

const NewTodoPage = () => {
  return <TodoForm />;
};

export default NewTodoPage;
