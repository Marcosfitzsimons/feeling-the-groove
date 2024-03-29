import { type ClassValue, clsx } from "clsx"
import { addMinutes, differenceInDays, format } from "date-fns";
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

export function convertToDBDate(dateObject: Date) {
  const isoDateString = format(dateObject, 'yyyy-MM-dd') + 'T00:00:00Z';
  return isoDateString;
}