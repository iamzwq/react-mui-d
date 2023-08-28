import dayjs from "dayjs";

type DateType = string | number | dayjs.Dayjs | Date | null | undefined;

type FormatType =
  | "YYYY-MM-DD HH:mm:ss"
  | "YYYY-MM-DD"
  | "ddd, MMMM D, YYYY"
  | "ddd, MMM D, YYYY";

export const formatDate = (date: DateType, format: FormatType = "ddd, MMMM D, YYYY") => {
  if (!date) return "";
  return dayjs(date).format(format);
};
