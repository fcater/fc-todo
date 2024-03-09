"use client";

import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { Todo } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

import Message, { MESSAGE_STATUS } from "@/app/components/Message";
import Spinner from "@/app/components/Spinner";
import { todoSchema } from "../validationSchemas";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type FormData = z.infer<typeof todoSchema>;

const TodoForm = ({ todo }: { todo?: Todo }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (todo) await axios.patch("/api/todos/" + todo.id, data);
      else await axios.post("/api/todos", data);
      router.push("/todos/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("未知错误发生了.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5 ">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input defaultValue={todo?.title} placeholder="标题" {...register("title")} />
        </TextField.Root>
        <Message status={MESSAGE_STATUS.error}>{errors.title?.message}</Message>
        <Controller
          name="description"
          control={control}
          defaultValue={todo?.description}
          render={({ field }) => <SimpleMDE placeholder="详细描述" {...field} />}
        />
        <Message status={MESSAGE_STATUS.error}>{errors.description?.message}</Message>
        <Button disabled={isSubmitting}>
          {todo ? "更 新" : "创 建"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TodoForm;
