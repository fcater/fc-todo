"use client";

import React from "react";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, Cell, PieChart, Pie, PieLabelRenderProps } from "recharts";

interface Props {
  doneTodosCount: number;
  notDoneTodosCount: number;
}

const COLORS = ["green", "orange"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx = 0,
  cy = 0,
  innerRadius = 0,
  outerRadius = 0,
  midAngle = 0,
  percent = 0,
}: PieLabelRenderProps) => {
  const _cx = Number(cx);
  const _cy = Number(cy);
  const _innerRadius = Number(innerRadius);
  const _outerRadius = Number(outerRadius);
  const radius = _innerRadius + (_outerRadius - _innerRadius) * 0.5;
  const x = _cx + radius * Math.cos(-midAngle * RADIAN);
  const y = _cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > _cy ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TodoChart = ({ doneTodosCount, notDoneTodosCount }: Props) => {
  const data = [
    { label: "已完成", value: doneTodosCount },
    { label: "未完成", value: notDoneTodosCount },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TodoChart;
