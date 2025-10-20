import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/ufugoSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL ,CUSTOMER_ROLE} from "../../constants/config";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import withAuthorization from "../../constants/hoc/withAuthorization";
const Cart = () => {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");

  const [showPlaceOrderDialog, setShowPlaceOrderDialog] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [payments, setPayments] = useState("");
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [errAddress, setAddressError] = useState("");
  const [errCity, setCityError] = useState("");
  const [errPayment, setPaymentError] = useState("");

  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/payments`);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        toast.error("Failed to fetch payment methods.");
      }
    };

    fetchPayments();
  }, []);


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

    if (!paymentMethod.trim()) {
      setPaymentError("Please enter your payment method.");
      isValid = false;
    } else {
      setPaymentError("");
    }

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

  const handlePlaceOrder = async () => {

    if (validateFields()) {
      setIsLoading(true);
      try {

        const formData = {

          trackingId: uuidv4(),
          user: {
            id: sessionStorage.getItem('sessionId')
          }, 
          address: address,
          city: city,
          orderDate : new Date().toISOString() ,
          paymentMethod: {
            id: paymentMethod 
          },
          totalAmount: totalAmt + shippingCharge,
          status: 'PENDING'
        };

        const orderResponse = await axios.post(`${BASE_URL}/api/customer/orders/create`, formData);

        const orderId = orderResponse.data.id;

        // Now, associate order items with the created order
        for (const item of products) {

            const orderItemData = {
                order: {
                  id: orderId 
                },
                product: { 
                  id: item.id 
                },
                quantity: item.quantity,
                price: item.price
            };

            // Post order item data
            await axios.post(`${BASE_URL}/api/customer/order-items/add`, orderItemData);
        }

        console.log("Order placed successfully:", orderResponse.data);
        // Reset the cart after placing the order
        dispatch(resetCart());

        // Close the place order dialog
        setShowPlaceOrderDialog(false);
        // Optionally, navigate to the order route
        // navigate("/order");

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
    toast.info("This feature will be available very soon...", {
      position: "top-center",
      autoClose: 3000, // 3 seconds
    });
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
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
            <div className="w-96 flex flex-col gap-4">
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
                  onClick={() => setShowPlaceOrderDialog(true)}
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                  <div className="bg-white p-6 rounded-lg">
                    <p className="text-lg font-semibold mb-4">Place Order</p>
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
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        >
                          {/* Map over paymentMethods array to render options */}
                          <option value="">Select payment method</option>
                          {payments.map((method) => (
                            <option key={method.id} value={method.id}>
                              {method.paymentMethod}
                            </option>
                          ))}

                        </select>
                        {errPayment && (
                          <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                            <span className="font-bold italic mr-1">!</span>
                            {errPayment}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handlePlaceOrder}
                        className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white px-4 py-2 rounded-md mr-2"
                      >
                        Order
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
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
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

export default withAuthorization(Cart,[CUSTOMER_ROLE]);
