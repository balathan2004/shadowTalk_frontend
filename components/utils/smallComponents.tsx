import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export const timeHandler = (date: any) => {
    return date ? `joined ${formatDistanceToNow(new Date(date))}` : null;
  };
