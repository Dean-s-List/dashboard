import React from "react";
import { HeadingToolbar } from "@udecode/plate";
import type { ToolbarProps } from "@udecode/plate";

export const Toolbar = (props: ToolbarProps) => (
  <HeadingToolbar
    {...props}
    className="flex w-full items-center justify-center"
  />
);
