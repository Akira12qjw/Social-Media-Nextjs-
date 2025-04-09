import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export const formatTimeFromNow = (date: string) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: vi,
  });
};
