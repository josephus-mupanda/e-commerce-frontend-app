import { apiSlice } from "./apiSlice";
import { unwrapApiArray, unwrapApiPayload } from "@/utils/apiResponse";

export const shopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerCategories: builder.query<any[], void>({
      query: () => "/api/customer/categories",
      transformResponse: (response: unknown) => unwrapApiArray(response),
      providesTags: ["Categories"],
    }),
    getAdminCategories: builder.query<any[], void>({
      query: () => "/api/admin/categories",
      transformResponse: (response: unknown) => unwrapApiArray(response),
      providesTags: ["Categories"],
    }),
    getCustomerProducts: builder.query<any[], void>({
      query: () => "/api/customer/products",
      transformResponse: (response: unknown) => unwrapApiArray(response),
      providesTags: ["Products"],
    }),
    getAdminProducts: builder.query<any[], void>({
      query: () => "/api/admin/products",
      transformResponse: (response: unknown) => unwrapApiArray(response),
      providesTags: ["Products"],
    }),
    getPayments: builder.query<any[], void>({
      query: () => "/api/admin/payments",
      transformResponse: (response: unknown) => unwrapApiArray(response),
      providesTags: ["Payments"],
    }),
    getUsers: builder.query<any[], void>({
      query: () => "/api/admin/users",
      transformResponse: (response: unknown) => unwrapApiArray(response),
      providesTags: ["Users"],
    }),
    getCustomerOrders: builder.query<any[], string | number | null>({
      query: () => "/api/customer/orders",
      transformResponse: (response: unknown) => unwrapApiArray(response),
      providesTags: ["Orders"],
    }),
    getAdminOrders: builder.query<any[], void>({
      query: () => "/api/admin/orders",
      transformResponse: (response: unknown) => unwrapApiArray(response),
      providesTags: ["Orders"],
    }),
    getOrder: builder.query<any, string | number>({
      query: (id) => `/api/customer/orders/${id}`,
      transformResponse: (response: unknown) => unwrapApiPayload(response, null),
      providesTags: ["Orders"],
    }),
    getOrderItems: builder.query<any[], string | number>({
      query: (orderId) => `/api/customer/order-items/order/${orderId}`,
      transformResponse: (response: unknown) => unwrapApiArray(response),
      providesTags: ["OrderItems"],
    }),
  }),
});

export const {
  useGetCustomerCategoriesQuery,
  useGetAdminCategoriesQuery,
  useGetCustomerProductsQuery,
  useGetAdminProductsQuery,
  useGetPaymentsQuery,
  useGetUsersQuery,
  useGetCustomerOrdersQuery,
  useGetAdminOrdersQuery,
  useGetOrderQuery,
  useGetOrderItemsQuery,
} = shopApi;
