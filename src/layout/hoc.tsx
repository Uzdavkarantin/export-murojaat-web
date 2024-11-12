import { ROUTER } from "@/constants/routers";
import { ChildProps } from "@/types";
import { Navigate } from "react-router-dom";

export const Hoc = ({ children }: ChildProps) => {
  const user = true;

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to={ROUTER.LOGIN} />;
  }
};
