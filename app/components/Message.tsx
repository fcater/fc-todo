import { Text } from "@radix-ui/themes";
import React, { ReactNode } from "react";

export enum MESSAGE_STATUS {
  error = "red",
  success = "green",
  loading = "blue",
}

type MessageProps = {
  children?: ReactNode;
  status?: MESSAGE_STATUS;
};

const Message = ({ children, status = MESSAGE_STATUS.error }: MessageProps) => {
  if (!children) return null;

  return (
    <Text color={status} as="p">
      {children}
    </Text>
  );
};

export default Message;
