import { baseURL } from "@/constants";
import { ErrorProps } from "@/types/error";
import { getUser } from "@/utils/user";
import axios from "axios";

export const request = axios.create({
  baseURL,
});

request.interceptors.request.use(
  async config => {
    const user = getUser();
    if (user) {
      config.headers.set("Authorization", `Bearer ${user?.access}`);
    }
    return config;
  },
  async error => {
    return await Promise.reject(error);
  },
);

request.interceptors.response.use(
  response => {
    return response;
  },
  async (error: ErrorProps) => {
    return await Promise.reject(error);
  },
);
