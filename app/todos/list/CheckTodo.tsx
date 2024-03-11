"use client";

import axios from "axios";
import React, { useState } from "react";
import { Todo } from "@prisma/client";
import { AlertDialog,  Table } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components";

const CheckTodo = ({ todo }: { todo: Todo }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await axios.patch("/api/todos/" + todo.id, { hasDone: true });
      router.push("/todos/list");
      router.refresh();
    } catch (error) {
      setError("未知错误发生了.");
      router.push("/api/auth/signin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Table.Cell className="cursor-pointer">
        {!todo.hasDone && !loading && <CheckIcon onClick={handleCheck} />}
        {loading && <Spinner />}
      </Table.Cell>
      <AlertDialog.Root open={Boolean(error)}>
        <AlertDialog.Content>
          <AlertDialog.Title>错误</AlertDialog.Title>
          <AlertDialog.Description>请求失败！</AlertDialog.Description> 
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default CheckTodo;
