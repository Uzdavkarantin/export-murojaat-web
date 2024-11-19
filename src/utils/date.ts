import dayjs from "dayjs";

export const setUTCTime = (date: string, template?: string) => {
  return !date ? null : dayjs(new Date(date)).format(template || "YYYY-MM-DD H:mm");
};
