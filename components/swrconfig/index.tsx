"use client";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: any;
}) => {
  return <SWRConfig value={{ fallback }}>{children}</SWRConfig>;
};
