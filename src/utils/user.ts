import { AuthTokens } from "@/types/auth";

export const clearUser = () => {
  localStorage.removeItem("user");
};

export const setUser = (data: AuthTokens) => {
  const user = JSON.stringify(data);
  localStorage.setItem("user", user);
};

export const getUser = () => {
  const user: AuthTokens = JSON.parse(
    localStorage.getItem("user") === "undefined"
      ? "null"
      : (localStorage.getItem("user") as string),
  );
  return user;
};
