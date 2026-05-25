import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "@/components/home/Footer/Footer";
import FooterBottom from "@/components/home/Footer/FooterBottom";
import Header from "@/components/home/Header/Header";
import HeaderBottom from "@/components/home/Header/HeaderBottom";
import SpecialCase from "@/components/SpecialCase/SpecialCase";
import AdminShell from "@/pages/Admin/AdminShell";
import About from "@/pages/About/About";
import SignIn from "@/pages/Account/SignIn";
import SignUp from "@/pages/Account/SignUp";
import ResetPassword from "@/pages/Account/ResetPassword";
import ForgotPassword from "@/pages/Account/ForgotPassword";
import ConfirmationPage from "@/pages/Account/ConfirmationPage";
import Cart from "@/pages/Cart/Cart";
import WishList from "@/pages/WishList/WishList";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import Order from "@/pages/Order/Order";
import Offer from "@/pages/Offer/Offer";
import Payment from "@/pages/payment/Payment";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import Shop from "@/pages/Shop/Shop";
import CategoryManagement from "@/pages/Admin/Category/CategoryManagement";
import ProductManagement from "@/pages/Admin/Product/ProductManagement";
import OrderManagement from "@/pages/Admin/Order/OrderManagement";
import Logout from "@/pages/Admin/Logout/Logout";
import Analytics from "@/pages/Admin/Analytics/Analytics";
import CreateCategory from "@/pages/Admin/Category/CreateCategory";
import CreateProduct from "@/pages/Admin/Product/CreateProduct";
import EditCategory from "@/pages/Admin/Category/EditCategory";
import EditProduct from "@/pages/Admin/Product/EditProduct";
import PaymentManagement from "@/pages/Admin/PaymentMethod/PaymentManagement";
import CreatePaymentMethod from "@/pages/Admin/PaymentMethod/CreatePaymentMethod";
import EditPaymentMethod from "@/pages/Admin/PaymentMethod/EditPaymentMethod";
import UserManagement from "@/pages/Admin/Users/UserManagement";
import OrderDetails from "@/pages/Order/OrderDetails";
import AccessDenied from "@/constants/hoc/AccessDenied";
import AuthenticationFailed from "@/constants/hoc/AuthenticationFailed";
import NotFound from "@/constants/hoc/NotFound";

const ShopLayout = () => (
  <div>
    <Header />
    <HeaderBottom />
    <SpecialCase />
    <ScrollRestoration />
    <Outlet />
    <Footer />
    <FooterBottom />
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ShopLayout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/category/:category" element={<Offer />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/paymentgateway" element={<Payment />} />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/api/users/confirm" element={<ConfirmationPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/authentication-failed" element={<AuthenticationFailed />} />

      <Route path="/admin/*" element={<AdminShell />}>
        <Route index element={<Analytics />} />
        <Route path="customers" element={<UserManagement />} />
        <Route path="category" element={<CategoryManagement />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="update-category/:id" element={<EditCategory />} />
        <Route path="product" element={<ProductManagement />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="update-product/:id" element={<EditProduct />} />
        <Route path="payment-method" element={<PaymentManagement />} />
        <Route path="create-payment" element={<CreatePaymentMethod />} />
        <Route path="update-payment/:id" element={<EditPaymentMethod />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Route>
  )
);

export const AppRoutes = () => <RouterProvider router={router} />;
