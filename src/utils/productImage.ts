import { resolveMediaUrl } from "./mediaUrl";

const looksLikeBase64 = (value: string) =>
  /^[A-Za-z0-9+/]+={0,2}$/.test(value) && value.length > 120;

export const getProductImageSrc = (value?: string | null) => {
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (looksLikeBase64(value)) return `data:image/jpeg;base64,${value}`;
  return resolveMediaUrl(value);
};
