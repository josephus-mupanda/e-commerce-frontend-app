// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "@/store/cartSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { toast } from "sonner";
import apiClient from "@/store/apiClient";
import { BASE_URL } from "../../constants/config";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
const Cart = () => {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");

  const [showPlaceOrderDialog, setShowPlaceOrderDialog] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState("order");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [sector, setSector] = useState("");
  const [errAddress, setAddressError] = useState("");
  const [errCity, setCityError] = useState("");

  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    if (totalAmt <= 20000) {
      setShippingCharge(1000);
    } else if (totalAmt <= 40000) {
      setShippingCharge(500);
    } else if (totalAmt > 40001) {
      setShippingCharge(300);
    }
  }, [totalAmt]);

  const validateFields = () => {

    let isValid = true;

    if (!address.trim()) {
      setAddressError("Please enter your address.");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (!city.trim()) {
      setCityError("Please enter your city.");
      isValid = false;
    } else {
      setCityError("");
    }

    return isValid;
  };

  const getCartItems = () =>
    products.map((item) => ({
      productId: item.id || item._id,
      quantity: Number(item.quantity || 1),
      price: Number(item.price || 0),
    }));

  const createOrder = async (status = "PENDING") => {
    const orderResponse = await apiClient.post(`${BASE_URL}/api/customer/orders`, {
      address,
      city,
      sector,
      status,
    });

    const orderId = orderResponse.data?.id;
    if (!orderId) {
      throw new Error("Order response is missing an id.");
    }

    await Promise.all(
      getCartItems().map((item) =>
        apiClient.post(`${BASE_URL}/api/customer/order-items/add/${orderId}`, item)
      )
    );

    return orderResponse.data;
  };

  const getCheckoutIdempotencyKey = () => {
    const fingerprint = JSON.stringify({
      address,
      city,
      total: Number(totalAmt) + Number(shippingCharge),
      items: getCartItems().map(({ productId, quantity }) => ({ productId, quantity })),
    });
    const stored = JSON.parse(sessionStorage.getItem("stripeCheckoutIntent") || "{}");

    if (stored.fingerprint === fingerprint && stored.key) {
      return stored.key;
    }

    const key =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    sessionStorage.setItem("stripeCheckoutIntent", JSON.stringify({ fingerprint, key }));
    return key;
  };

  const handlePlaceOrder = async () => {

    if (validateFields()) {
      setIsLoading(true);
      try {
        await createOrder("PENDING");
        toast.success("Order placed successfully.");
        dispatch(resetCart());
        setShowPlaceOrderDialog(false);
      }
      catch(error){
        console.error("Error placing order:", error);
        toast.error("Failed to place order.");
      } finally {
        setIsLoading(false); // Reset loading state after placing the order
      }
    }
  };

  
  const handlePayNow = () => {
    setCheckoutMode("stripe");
    setShowPlaceOrderDialog(true);
  };

  const handleStripeCheckout = async () => {
    if (validateFields()) {
      setIsLoading(true);
      try {
        const idempotencyKey = getCheckoutIdempotencyKey();
        const response = await apiClient.post(
          `${BASE_URL}/api/customer/payments/stripe/checkout-session`,
          {
            address,
            city,
            currency: import.meta.env.VITE_STRIPE_CURRENCY || "rwf",
            idempotencyKey,
            items: getCartItems().map(({ productId, quantity }) => ({
              productId,
              quantity,
            })),
          },
          {
            headers: {
              "Idempotency-Key": idempotencyKey,
            },
          }
        );

        const checkoutUrl = response.data?.checkoutUrl || response.data?.url;
        if (!checkoutUrl) {
          throw new Error("Stripe checkout URL is missing.");
        }

        window.location.assign(checkoutUrl);
      } catch (error) {
        console.error("Error starting Stripe checkout:", error);
        toast.error("Failed to start secure payment.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="jshop-page max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="jshop-data-panel pb-20 p-4">
          <div className="jshop-table-header w-full h-20 text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white rounded-md cursor-pointer font-semibold  mb-4  duration-300"
          >
            Reset cart
          </button>
          <div className="max-w-7xl gap-4 flex justify-center mt-4">
            <div className="jshop-summary-card w-96 flex flex-col gap-4 p-5">
              <h1 className="text-2xl font-semibold text-left">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    {totalAmt} Rwf
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    {shippingCharge} Rwf
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {totalAmt + shippingCharge} Rwf
                  </span>
                </p>
              </div>

              {/* Place order button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setCheckoutMode("order");
                    setShowPlaceOrderDialog(true);
                  }}
                  className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white rounded-md cursor-pointer mr-2 px-8 py-2 font-titleFont font-semibold text-lg  duration-300"
                >
                  Place Order
                </button>
                <button
                  onClick={handlePayNow}
                  className="bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700  active:bg-blue-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300"
                >
                  Pay Now
                </button>

              </div>
              {/* Loading spinner */}
              {isLoading && (
                <div className="flex justify-center mt-4">
                  <LoadingSpinner />
                </div>
              )}
              {/* Place order dialog */}
              {showPlaceOrderDialog && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
                  <div className="jshop-form-card p-6">
                    <p className="text-lg font-semibold mb-4">
                      {checkoutMode === "stripe" ? "Secure checkout" : "Place Order"}
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-.5">
                        <input
                          type="text"
                          placeholder="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
          
                        />
                        {errAddress && (
                          <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                            <span className="font-bold italic mr-1">!</span>
                            {errAddress}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-.5">
                        <input
                          type="text"
                          placeholder="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                   
                        />
                        {errCity && (
                        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                          <span className="font-bold italic mr-1">!</span>
                          {errCity}
                        </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-.5">
                        <input
                          type="text"
                          placeholder="sector / quartier"
                          value={sector}
                          onChange={(e) => setSector(e.target.value)}
                          className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        />
                      </div>
                      {checkoutMode === "stripe" && (
                        <p className="jshop-info-panel p-3 text-sm font-semibold text-primeColor">
                          Payment will continue in Stripe Checkout with duplicate-charge protection.
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={checkoutMode === "stripe" ? handleStripeCheckout : handlePlaceOrder}
                        disabled={isLoading}
                        className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white px-4 py-2 rounded-md mr-2"
                      >
                        {checkoutMode === "stripe" ? "Pay with Stripe" : "Order"}
                      </button>
                      <button
                        onClick={() => setShowPlaceOrderDialog(false)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="jshop-empty-card max-w-[500px] p-4 py-8 flex gap-4 flex-col items-center">
            <h1 className="font-titleFont text-xl font-bold uppercase">
            Your Cart feels empty.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart awaits delicious treats. Give it purpose - fill it with
              fresh produce, gourmet snacks,breads, juices , and more, and satisfy your cravings.
            </p>
            <Link to="/shop">
              <button className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white rounded-md cursor-pointer active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
