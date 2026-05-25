import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { getApiBaseUrl } from "@/utils/apiBaseUrl";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequest {
  url: string;
  method?: ApiMethod;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

const tagTypes = [
  "Auth",
  "Users",
  "Categories",
  "Products",
  "Payments",
  "Orders",
  "OrderItems",
  "Contact",
] as const;

const normaliseUrl = (url: string) => {
  if (!url) return "/";

  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return url.startsWith("/") ? url : `/${url}`;
  }
};

const withParams = (
  url: string,
  params?: ApiRequest["params"]
) => {
  if (!params) return url;
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  if (!queryString) return url;
  return `${url}${url.includes("?") ? "&" : "?"}${queryString}`;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    credentials: "include",
    prepareHeaders: (headers) => {
      const token =
        sessionStorage.getItem("accessToken") ||
        localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [...tagTypes],
  endpoints: (builder) => ({
    apiRequest: builder.mutation<ApiResponse, ApiRequest>({
      async queryFn(request, _api, _extraOptions, baseQuery) {
        const args: FetchArgs = {
          url: withParams(normaliseUrl(request.url), request.params),
          method: request.method ?? "GET",
          body: request.body,
        };

        const result = await baseQuery(args);
        if (result.error) {
          return { error: result.error as FetchBaseQueryError };
        }

        const meta = result.meta as FetchBaseQueryMeta | undefined;
        return {
          data: {
            data: result.data,
            status: meta?.response?.status ?? 200,
          },
        };
      },
      invalidatesTags: (_result, _error, arg) =>
        arg.method && arg.method !== "GET" ? [...tagTypes] : [],
    }),
  }),
});

export const { useApiRequestMutation } = apiSlice;
