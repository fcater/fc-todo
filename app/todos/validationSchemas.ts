import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "标题是必须的.").max(255),
  description: z.string().min(1, "描述是必须的.").max(65535),
});
