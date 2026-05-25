import { getMediaBaseUrl } from "./apiBaseUrl";

export const resolveMediaUrl = (value?: string | null): string => {
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;

  try {
    return new URL(value, getMediaBaseUrl()).toString();
  } catch {
    return value;
  }
};
