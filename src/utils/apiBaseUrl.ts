export const getApiBaseUrl = () =>
  String(
    import.meta.env.VITE_API_BASE_URL ||
      "https://e-commerce-backend-spring-boot.onrender.com"
  )
    .trim()
    .replace(/\/$/, "");

export const getMediaBaseUrl = () =>
  String(import.meta.env.VITE_MEDIA_BASE_URL || getApiBaseUrl())
    .trim()
    .replace(/\/$/, "");
