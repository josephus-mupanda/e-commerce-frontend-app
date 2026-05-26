import { apiSlice, type ApiMethod, type ApiResponse } from "./apiSlice";
import { store } from "./store";

const request = async <T = unknown>(
  method: ApiMethod,
  url: string,
  body?: unknown,
  options?: { headers?: Record<string, string> }
): Promise<ApiResponse<T>> => {
  const action = store.dispatch(
    apiSlice.endpoints.apiRequest.initiate({
      url,
      method,
      body,
      headers: options?.headers,
    })
  );

  return (await action.unwrap()) as ApiResponse<T>;
};

const apiClient = {
  get: <T = unknown>(url: string) => request<T>("GET", url),
  post: <T = unknown>(
    url: string,
    body?: unknown,
    options?: { headers?: Record<string, string> }
  ) => request<T>("POST", url, body, options),
  put: <T = unknown>(
    url: string,
    body?: unknown,
    options?: { headers?: Record<string, string> }
  ) => request<T>("PUT", url, body, options),
  patch: <T = unknown>(
    url: string,
    body?: unknown,
    options?: { headers?: Record<string, string> }
  ) => request<T>("PATCH", url, body, options),
  delete: <T = unknown>(url: string) => request<T>("DELETE", url),
};

export default apiClient;
