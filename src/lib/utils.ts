import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusColor = {
  SCHEDULED: "bg-blue-50 text-blue-700 hover:bg-blue-200",
  ACTIVE: "bg-green-50 text-green-700 hover:bg-green-200",
  FINISHED: "bg-gray-50 text-gray-700 hover:bg-gray-200"
};

export const getStatusLabel = {
  SCHEDULED: "Запланирован",
  ACTIVE: "Активный",
  FINISHED: "Завершён"
};
