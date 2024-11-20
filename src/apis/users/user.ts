import { request } from "@/configs/requests";
import { RobotUserProps } from "@/types/user";

export const getRobotUserById = async (
  userId: string | number | undefined,
): Promise<RobotUserProps> => {
  const response = await request.get<RobotUserProps>(`robot/user/${userId}/`);
  return response.data;
};
