export type ApiEnvelope<T = unknown> = {
  message?: string;
  payload?: T;
  data?: T;
};

export const unwrapApiPayload = <T = unknown>(response: unknown, fallback: T): T => {
  if (response && typeof response === "object") {
    const value = response as ApiEnvelope<T>;
    if ("payload" in value && value.payload !== undefined && value.payload !== null) {
      return value.payload;
    }
    if ("data" in value && value.data !== undefined && value.data !== null) {
      return value.data;
    }
  }

  return (response as T) ?? fallback;
};

export const unwrapApiArray = <T = unknown>(response: unknown): T[] => {
  const payload = unwrapApiPayload<T[] | unknown>(response, []);
  return Array.isArray(payload) ? payload : [];
};

export const getApiMessage = (response: unknown, fallback = "") => {
  if (response && typeof response === "object" && "message" in response) {
    const message = (response as ApiEnvelope).message;
    if (typeof message === "string") return message;
  }

  return fallback;
};
