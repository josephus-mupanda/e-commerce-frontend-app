import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";

import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import AdminHeader from "./pages/Admin/AdminHeader/AdminHeader";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import ResetPassword from "./pages/Account/ResetPassword";
import ForgotPassword from "./pages/Account/ForgotPassword";
import ConfirmationPage from "./pages/Account/ConfirmationPage";
import Cart from "./pages/Cart/Cart";
import WishList from "./pages/WishList/WishList.js";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Order from "./pages/Order/Order";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryManagement from "./pages/Admin/Category/CategoryManagement";
import ProductManagement from "./pages/Admin/Product/ProductManagement";
import OrderManagement from "./pages/Admin/Order/OrderManagement";
import Logout from "./pages/Admin/Logout/Logout";
import Analytics from "./pages/Admin/Analytics/Analytics";
import CreateCategory from "./pages/Admin/Category/CreateCategory";
import CreateProduct from "./pages/Admin/Product/CreateProduct";
import EditCategory from "./pages/Admin/Category/EditCategory";
import EditProduct from "./pages/Admin/Product/EditProduct";
import PaymentManagement from "./pages/Admin/PaymentMethod/PaymentManagement";
import CreatePaymentMethod from "./pages/Admin/PaymentMethod/CreatePaymentMethod";
import EditPaymentMethod from "./pages/Admin/PaymentMethod/EditPaymentMethod";
import UserManagement from "./pages/Admin/Users/UserManagement";
import OrderDetails from "./pages/Order/OrderDetails.js";
import AccessDenied from "./constants/hoc/AccessDenied";
import AuthenticationFailed from "./constants/hoc/AuthenticationFailed";
import NotFound from "./constants/hoc/NotFound";
import { AppProvider } from "./context/AppContext.js";

const Layout = () => {
  return (
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
};

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      {/* <AdminHeaderBottom /> */}
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(

    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/order" element={<Order />}></Route>
        
        {/*=================================================================== */}

        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:category" element={<Offer />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/order/:id" element={<OrderDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/wishlist" element={<WishList />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      
      </Route>

      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/api/users/confirm" element={<ConfirmationPage />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>

      {/*=================================================================== */}
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/authentication-failed" element={<AuthenticationFailed />} />
      {/*=================================================================== */}
      
      {/* Admin Dashboard Routes */}
        <Route path="/admin/*" element={<AdminLayout/>}>
          {/* <Route index element={<Analytics />}></Route> */}

          <Route index element={<UserManagement />}></Route>
          
          {/* <Route path="customer" element={<UserManagement/>}></Route> */}

          <Route path="category" element={<CategoryManagement/>}></Route>
          <Route path="create-category" element={<CreateCategory/>}></Route>
          <Route path="update-category/:id" element={<EditCategory/>}></Route>

          <Route path="product" element={<ProductManagement />}></Route>
          <Route path="create-product" element={< CreateProduct />}></Route>
          <Route path="update-product/:id" element={< EditProduct />}></Route>

          <Route path="payment-method" element={<PaymentManagement />}></Route>
          <Route path="create-payment" element={< CreatePaymentMethod />}></Route>
          <Route path="update-payment/:id" element={< EditPaymentMethod/>}></Route>

          <Route path="orders" element={<OrderManagement />}></Route>
          <Route path="logout" element={<Logout />}></Route>
        </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <AppProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AppProvider>
    </div>
  );
}

export default App;
