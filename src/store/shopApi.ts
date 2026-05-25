import { apiSlice } from "./apiSlice";

export const shopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerCategories: builder.query<any[], void>({
      query: () => "/api/customer/categories",
      providesTags: ["Categories"],
    }),
    getAdminCategories: builder.query<any[], void>({
      query: () => "/api/admin/categories",
      providesTags: ["Categories"],
    }),
    getCustomerProducts: builder.query<any[], void>({
      query: () => "/api/customer/products",
      providesTags: ["Products"],
    }),
    getAdminProducts: builder.query<any[], void>({
      query: () => "/api/admin/products",
      providesTags: ["Products"],
    }),
    getPayments: builder.query<any[], void>({
      query: () => "/api/admin/payments",
      providesTags: ["Payments"],
    }),
    getUsers: builder.query<any[], void>({
      query: () => "/api/users",
      providesTags: ["Users"],
    }),
    getCustomerOrders: builder.query<any[], string | number | null>({
      query: (userId) => `/api/customer/orders/user/${userId}`,
      providesTags: ["Orders"],
    }),
    getAdminOrders: builder.query<any[], void>({
      query: () => "/api/admin/orders",
      providesTags: ["Orders"],
    }),
    getOrder: builder.query<any, string | number>({
      query: (id) => `/api/customer/orders/${id}`,
      providesTags: ["Orders"],
    }),
    getOrderItems: builder.query<any[], string | number>({
      query: (orderId) => `/api/customer/order-items/order/${orderId}`,
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
