import React from "react";
import { Badge as RadixBadge } from "@radix-ui/themes";
import { Priority } from "@prisma/client";

type Color = "red" | "violet" | "green";

const priorityMap: Record<Priority, { label: string; color: "red" | "violet" | "green" }> = {
  HIGH: { label: "高优先", color: "red" },
  MEDIUM: { label: "中优先", color: "violet" },
  LOW: { label: "低优先", color: "green" },
};

const Badge = ({ label, color }: { label: string; color: Color }) => {
  return <RadixBadge color={color}>{label}</RadixBadge>;
};

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  return <Badge color={priorityMap[priority].color} label={priorityMap[priority].label} />;
};

Badge.Priority = PriorityBadge;

export default Badge;
