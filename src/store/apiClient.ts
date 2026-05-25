import { apiSlice, type ApiMethod, type ApiResponse } from "./apiSlice";
import { store } from "./store";

const request = async <T = unknown>(
  method: ApiMethod,
  url: string,
  body?: unknown
): Promise<ApiResponse<T>> => {
  const action = store.dispatch(
    apiSlice.endpoints.apiRequest.initiate({ url, method, body })
  );

  return (await action.unwrap()) as ApiResponse<T>;
};

const apiClient = {
  get: <T = unknown>(url: string) => request<T>("GET", url),
  post: <T = unknown>(url: string, body?: unknown) =>
    request<T>("POST", url, body),
  put: <T = unknown>(url: string, body?: unknown) =>
    request<T>("PUT", url, body),
  patch: <T = unknown>(url: string, body?: unknown) =>
    request<T>("PATCH", url, body),
  delete: <T = unknown>(url: string) => request<T>("DELETE", url),
};

export default apiClient;
