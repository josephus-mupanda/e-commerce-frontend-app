import { useContext, useMemo } from "react";
import {
  ArrowUpRight,
  Clock3,
  CreditCard,
  PackageCheck,
  ShoppingBag,
  Users,
} from "lucide-react";
import { AppContext } from "@/contexts/AppContext";
import { ADMIN_ROLE } from "@/constants/config";
import withAuthorization from "@/constants/hoc/withAuthorization";

const statusTone: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  DISPATCHED: "bg-teal-100 text-teal-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELED: "bg-red-100 text-red-700",
};

const Analytics = () => {
  const { product, adminOrders, payments, adminCategories } = useContext(AppContext);

  const totalRevenue = useMemo(
    () =>
      adminOrders
        .filter((order) => order.status !== "CANCELED")
        .reduce((total, order) => total + Number(order.totalAmount || 0), 0),
    [adminOrders]
  );

  const latestOrders = adminOrders.slice(0, 5);
  const lowStockProducts = product
    .filter((item) => Number(item.quantity || 0) <= 5)
    .slice(0, 4);

  const cards = [
    {
      title: "Revenue",
      value: `${totalRevenue.toLocaleString()} RWF`,
      icon: CreditCard,
      tone: "bg-orange-100 text-[#FF6A00]",
    },
    {
      title: "Active orders",
      value: adminOrders.length,
      icon: ShoppingBag,
      tone: "bg-teal-100 text-teal-700",
    },
    {
      title: "Catalog",
      value: product.length,
      icon: PackageCheck,
      tone: "bg-amber-100 text-amber-700",
    },
    {
      title: "Segments",
      value: adminCategories.length,
      icon: Users,
      tone: "bg-slate-100 text-slate-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-[#FF6A00]">Overview</p>
          <h2 className="text-2xl font-black text-primeColor">Admin Dashboard</h2>
          <p className="mt-1 max-w-2xl text-sm text-lightText">
            Track catalog health, order flow and payment readiness from one light glass console.
          </p>
        </div>
        <div className="glass-control inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-primeColor">
          <Clock3 className="h-4 w-4 text-[#FF6A00]" />
          Live operations
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="glass-panel rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase text-lightText">{card.title}</p>
                  <p className="mt-2 text-2xl font-black text-primeColor">{card.value}</p>
                </div>
                <div className={`rounded-2xl p-3 ${card.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
        <section className="glass-panel rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-primeColor">Recent orders</h3>
              <p className="text-sm text-lightText">Latest customer demand across the store.</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#FF6A00]" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200/70 text-xs uppercase text-lightText">
                  <th className="py-3">Tracking</th>
                  <th className="py-3">Customer</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 font-bold text-primeColor">{order.trackingId}</td>
                    <td className="py-3 text-lightText">{order.user?.username || "Customer"}</td>
                    <td className="py-3 font-bold">{Number(order.totalAmount || 0).toLocaleString()} RWF</td>
                    <td className="py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone[order.status] || "bg-slate-100 text-slate-700"}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {!latestOrders.length && (
                  <tr>
                    <td className="py-6 text-center text-lightText" colSpan={4}>
                      No orders available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-5">
          <h3 className="text-lg font-black text-primeColor">Action center</h3>
          <p className="text-sm text-lightText">Small details that usually need admin attention.</p>
          <div className="mt-4 space-y-3">
            <div className="glass-control rounded-xl p-4">
              <p className="text-xs font-bold uppercase text-lightText">Payment methods</p>
              <p className="mt-1 text-2xl font-black text-primeColor">{payments.length}</p>
            </div>
            <div className="glass-control rounded-xl p-4">
              <p className="text-xs font-bold uppercase text-lightText">Low stock products</p>
              <div className="mt-3 space-y-2">
                {lowStockProducts.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="font-bold text-primeColor">{item.name}</span>
                    <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                      {item.quantity} left
                    </span>
                  </div>
                ))}
                {!lowStockProducts.length && (
                  <p className="text-sm text-lightText">Inventory looks healthy.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default withAuthorization(Analytics, [ADMIN_ROLE]);
