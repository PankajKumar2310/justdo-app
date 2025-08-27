import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Add: centralized API base for live backend on Render
export const API_BASE_URL = "https://justdo-backend.onrender.com";