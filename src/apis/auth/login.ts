import { request } from "@/configs/requests";

export const logInUser = async <T>(data: T) => {
  return await request.post("token/", data);
};
