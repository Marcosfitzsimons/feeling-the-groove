import { type ClassValue, clsx } from "clsx"
import { addMinutes, format } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidJSONString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const correctDateFormat = (dbDate: Date) => {
  const adjustedDate = addMinutes(dbDate, dbDate.getTimezoneOffset());
  const formattedDateForDisplay = format(adjustedDate, "dd/MM/yyyy");
  return formattedDateForDisplay
}