import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const inDateFormat = new Date(date);

  return Intl.DateTimeFormat(undefined, { dateStyle: "short" }).format(
    inDateFormat,
  );
}
