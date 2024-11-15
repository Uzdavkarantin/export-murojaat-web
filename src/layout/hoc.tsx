import { ROUTER } from "@/constants/routers";
import { useUserStore } from "@/store/user";
import { ChildProps } from "@/types";
import { Navigate } from "react-router-dom";

export const Hoc = ({ children }: ChildProps) => {
  const user = useUserStore(state => state.user);

  if (user?.access) {
    return <>{children}</>;
  } else {
    return <Navigate to={ROUTER.LOGIN} />;
  }
};
