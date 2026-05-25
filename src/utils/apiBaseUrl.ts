export const getApiBaseUrl = () =>
  String(
    import.meta.env.VITE_API_BASE_URL ||
      "https://e-commerce-backend-spring-boot.onrender.com"
  )
    .trim()
    .replace(/\/$/, "");
