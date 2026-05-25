import { createContext, type ReactNode } from "react";
import {
  useGetAdminCategoriesQuery,
  useGetAdminOrdersQuery,
  useGetCustomerCategoriesQuery,
  useGetCustomerOrdersQuery,
  useGetCustomerProductsQuery,
  useGetPaymentsQuery,
} from "@/store/shopApi";

type AppContextValue = {
  categories: any[];
  adminCategories: any[];
  product: any[];
  payments: any[];
  orders: any[];
  adminOrders: any[];
  filteredAdminOrders: any[];
  orderLoading: boolean;
  loading: boolean;
  error: unknown;
};

export const AppContext = createContext<AppContextValue>({
  categories: [],
  adminCategories: [],
  product: [],
  payments: [],
  orders: [],
  adminOrders: [],
  filteredAdminOrders: [],
  orderLoading: false,
  loading: false,
  error: null,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const userId = sessionStorage.getItem("sessionId");

  const categoriesQuery = useGetCustomerCategoriesQuery();
  const adminCategoriesQuery = useGetAdminCategoriesQuery();
  const productsQuery = useGetCustomerProductsQuery();
  const paymentsQuery = useGetPaymentsQuery();
  const ordersQuery = useGetCustomerOrdersQuery(userId, { skip: !userId });
  const adminOrdersQuery = useGetAdminOrdersQuery();

  const loading =
    categoriesQuery.isLoading ||
    adminCategoriesQuery.isLoading ||
    productsQuery.isLoading ||
    paymentsQuery.isLoading;

  const error =
    categoriesQuery.error ||
    adminCategoriesQuery.error ||
    productsQuery.error ||
    paymentsQuery.error ||
    ordersQuery.error ||
    adminOrdersQuery.error ||
    null;

  return (
    <AppContext.Provider
      value={{
        categories: categoriesQuery.data ?? [],
        adminCategories: adminCategoriesQuery.data ?? [],
        product: productsQuery.data ?? [],
        payments: paymentsQuery.data ?? [],
        orders: ordersQuery.data ?? [],
        adminOrders: adminOrdersQuery.data ?? [],
        filteredAdminOrders: adminOrdersQuery.data ?? [],
        orderLoading: ordersQuery.isLoading,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
