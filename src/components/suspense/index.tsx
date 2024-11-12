import { Suspense as ReactSuspense } from "react";
import { Loader } from "../shared";
import { ChildProps } from "@/types";

export const Suspense = ({ children }: ChildProps) => (
  <ReactSuspense fallback={<Loader />}>{children}</ReactSuspense>
);
