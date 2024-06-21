import { format } from "date-fns";

export const formatDate = (dateString: string, dateFormat = "PPpp") => {
  const date = new Date(dateString);
  return format(date, dateFormat);
};
