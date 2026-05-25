import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  Store,
  Tags,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { logo } from "@/assets/images";
import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";
import { useApiRequestMutation } from "@/store/apiSlice";
import { clearAuth } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";

const navItems = [
  { title: "Dashboard", link: "/admin", icon: LayoutDashboard },
  { title: "Customers", link: "/admin/customers", icon: Users },
  { title: "Categories", link: "/admin/category", icon: Tags },
  { title: "Products", link: "/admin/product", icon: Package },
  { title: "Payments", link: "/admin/payment-method", icon: CreditCard },
  { title: "Orders", link: "/admin/orders", icon: ShoppingBag },
];

const AdminShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [apiRequest, { isLoading: isLoggingOut }] = useApiRequestMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { product, adminOrders, adminCategories, payments } = useContext(AppContext);

  const pageTitle = useMemo(() => {
    const active = navItems.find((item) =>
      item.link === "/admin"
        ? location.pathname === "/admin"
        : location.pathname.startsWith(item.link)
    );
    return active?.title ?? "Admin Console";
  }, [location.pathname]);

  const stats = [
    { label: "Products", value: product.length, icon: Package, accent: "bg-orange-100 text-[#FF6A00]" },
    { label: "Orders", value: adminOrders.length, icon: ShoppingBag, accent: "bg-teal-100 text-teal-700" },
    { label: "Categories", value: adminCategories.length, icon: Tags, accent: "bg-amber-100 text-amber-700" },
    { label: "Payments", value: payments.length, icon: CreditCard, accent: "bg-slate-100 text-slate-700" },
  ];

  const confirmLogout = async () => {
    try {
      await apiRequest({
        url: "/api/users/logout",
        method: "POST",
        body: {
          id: sessionStorage.getItem("sessionId"),
          role: sessionStorage.getItem("userRole"),
        },
      }).unwrap();
      dispatch(clearAuth());
      toast.success("Logging out...");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    } finally {
      setShowLogoutDialog(false);
    }
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-6 py-6">
        <img src={logo} alt="J-Shop" className="h-12 w-12 rounded-xl object-contain bg-white/70 p-1" />
        <div>
          <p className="text-lg font-black leading-tight text-primeColor">J-Shop</p>
          <p className="text-xs font-bold uppercase text-lightText">Admin console</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.link}
              to={item.link}
              end={item.link === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition ${
                  isActive
                    ? "bg-[#FF8533] text-white shadow-lg shadow-orange-500/20"
                    : "text-slate-600 hover:bg-white/70 hover:text-primeColor"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/60 p-3">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-600 transition hover:bg-white/70 hover:text-primeColor"
        >
          <Store className="h-5 w-5" />
          Storefront
        </button>
        <button
          type="button"
          onClick={() => setShowLogoutDialog(true)}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-transparent text-primeColor">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className="glass-panel fixed left-4 top-4 z-50 hidden h-[calc(100vh-2rem)] w-72 flex-col rounded-[1.5rem] lg:flex">
        <SidebarContent />
      </aside>

      <aside
        className={`glass-panel fixed inset-y-0 left-0 z-50 flex w-72 flex-col rounded-r-[1.5rem] transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end px-4 pt-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-full bg-white/80 p-2 text-slate-600"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <SidebarContent />
      </aside>

      <div className="lg:pl-80">
        <header className="sticky top-0 z-30 px-4 py-4 lg:px-8">
          <div className="glass-panel-strong flex items-center justify-between rounded-2xl px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-white/80 p-2 text-primeColor lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-lightText">
                  Operations
                </p>
                <h1 className="text-xl font-black text-primeColor">{pageTitle}</h1>
              </div>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <BarChart3 className="h-5 w-5 text-[#FF6A00]" />
              <span className="text-sm font-bold text-lightText">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </header>

        <main className="px-4 pb-10 lg:px-8">
          <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="glass-panel rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase text-lightText">{stat.label}</p>
                      <p className="mt-1 text-2xl font-black text-primeColor">{stat.value}</p>
                    </div>
                    <div className={`rounded-2xl p-3 ${stat.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          <div className="glass-panel-strong rounded-2xl p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {showLogoutDialog && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="glass-panel-strong w-full max-w-sm rounded-2xl p-6 text-center">
            <LogOut className="mx-auto mb-4 h-10 w-10 text-[#FF6A00]" />
            <h2 className="text-xl font-black">Log out?</h2>
            <p className="mt-2 text-sm text-lightText">
              Your admin session will be closed on this device.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutDialog(false)}
                className="glass-control flex-1 rounded-lg px-4 py-2 font-bold text-primeColor"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className="flex-1 rounded-lg bg-[#FF8533] px-4 py-2 font-bold text-white transition hover:bg-[#FF6A00] disabled:opacity-60"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminShell;
