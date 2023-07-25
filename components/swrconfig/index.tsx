"use client";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: any;
}) => {
  return <SWRConfig value={{ fallback: value }}>{children}</SWRConfig>;
};
