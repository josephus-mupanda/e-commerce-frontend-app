import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import { shipOrder,deliverOrder,paymentOrder,spinnerOrder } from "../../assets/images";
import { BASE_URL,CUSTOMER_ROLE } from "../../constants/config";
import withAuthorization from "../../constants/hoc/withAuthorization";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
const OrderDetails = () => {

  const { id } = useParams(); 
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
          try {

            const userId = sessionStorage.getItem('sessionId');
            const response = await axios.get(`${BASE_URL}/api/customer/orders/user/${userId}`);
            const orderData =  response.data;
            //console.log("Order Data ID :", orderData.id);

            const order = orderData.find(orders => orders.id == id);
            if (order) {
              const orderDetailsResponse = await axios.get(`${BASE_URL}/api/customer/orders/${id}`);
              const orderDetails = orderDetailsResponse.data;
              console.log("Order details:", orderDetails);
              setOrder(orderDetails);
              fetchOrderItems(id);
            } else {
              toast.error("Order not found.");
            }

            // for (const orders of orderData) {
            //   // For each order, make another API call to fetch additional details
            //   const orderId = orders.id;
            //   console.log("Order ID :", orderId);
            //   const orderDetailsResponse = await axios.get(`${BASE_URL}/api/customer/orders/${orderId}`);
            //   const orderDetails = orderDetailsResponse.data;
            //   console.log("Order details:", orderDetails);
            //   if(id == orderId){
            //     setOrder(orderDetails);
                
            //   } 
            //    // Fetch order items aogf the particular order
            //   fetchOrderItems(orderId);
            // }
    
            } catch (error) {
            toast.error("Failed to fetch order.");
            }
          };

          const fetchOrderItems = async (orderItemId) => {
            try {
              const response = await axios.get(`${BASE_URL}/api/customer/order-items/order/${orderItemId}`);
              const orderItemsData = response.data;
              console.log("Order items:", orderItemsData);
              setOrderItems(orderItemsData);
            } catch (error) {
              toast.error("Failed to fetch order items.");
            }
          };
        fetchOrder();
     },[id]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="Order Details" />
            
              {Object.keys(order).length !== 0 ? (
                <div className="mx-auto max-w-3xl" >
                <div className="grid grid-cols-2 gap-4 px-4">
                  <div className="col-span-1">
                  <div className="text-sm font-semibold border-b border-gray-300"></div>
                    <div className="font-medium text-gray-500 ">Tracking ID:</div>
                    
                    <div className="font-medium text-gray-500 ">User:</div>
                  
                    <div className="font-medium text-gray-500 ">Address:</div>
                    
                    <div className="font-medium text-gray-500  ">City:</div>
                  
                    <div className="font-medium text-gray-500 ">Amount:</div>
                    
                    <div className="font-medium text-gray-500  ">Date:</div>

                    <div className="font-medium text-gray-500  ">Payment method:</div>
                
                    <div className="font-medium text-gray-500  border-b border-gray-300">Status:</div>
                  </div>
                  <div className="col-span-1 border-l pl-4">
                    <div className="font-medium border-b border-gray-300"></div>
                    <div className="font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{order.trackingId}</div>
                    <div className="font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{order.user?.username || 'N/A'}</div>
                    <div className="font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{order.address}</div>
                    <div className="font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{order.city}</div>
                    <div className="font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{order.totalAmount} RWF</div>
                    <div className="font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{new Date(order.orderDate).toLocaleString()}</div>
                    <div className="font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{order.paymentMethod?.paymentMethod || 'N/A'}</div>
                    <div className="font-medium border-b border-gray-300">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                            order.status === "PENDING"
                            ? "bg-yellow-100  text-yellow-800"
                            : order.status === "DISPATCHED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "CANCELED"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >{order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8 px-4">
            
                        <div className="relative">
                            <div className="absolute items-center justify-center">
                                <img src={paymentOrder} alt="Deliver Order" className="h-16" />
                                {order.status === "PENDING" && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <img src={spinnerOrder} alt="Spinner" className="h-48 animate-spin" />
                                    </div>
                                )}
                            </div>
                            <span className="mt-20 flex flex-col items-center">
                                {order.status === "PENDING" ? (
                                <span className="bg-yellow-100  text-yellow-800 px-2 py-1 rounded-full">Paid</span>
                                ) : (
                                "Paid"
                                )}
                            </span>
                        </div>
                        <div className="relative">
                            <div className="absolute items-center justify-center">
                                <img src={shipOrder} alt="Deliver Order" className="h-16" />
                                {order.status === "DISPATCHED" && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <img src={spinnerOrder} alt="Spinner" className="h-48 animate-spin" />
                                    </div>
                                )}
                            </div>
                            <span className="mt-20 flex flex-col items-center">
                                {order.status === "DISPATCHED" ? (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">On the way</span>
                                ) : (
                                "On the way"
                                )}
                            </span>
                        </div>
                        <div className="relative">
                            <div className="absolute items-center justify-center">
                                <img src={deliverOrder} alt="Deliver Order" className="h-16" />
                                {order.status === "COMPLETED" && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <img src={spinnerOrder} alt="Spinner" className="h-48 animate-spin" />
                                    </div>
                                )}
                            </div>
                            <span className="mt-20 flex flex-col items-center">
                                {order.status === "COMPLETED" ? (
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Delivered</span>
                                ) : (
                                "Delivered"
                                )}
                            </span>
                        </div>
            
                  </div>
                  <br/>
                  <br/>
                </div> 
                </div>
                ) 
                  : 
                (
                  // Render a loading indicator or a message while fetching data
                  <div className="flex justify-center mt-4">
                    <LoadingSpinner />
                </div>
                )
              }
      
       
          {/* <p className="text-lg font-semibold mb-4">Order Items</p>
          <div>
          {Array.isArray(orderItems) && orderItems.map((item, index) => (
            <div key={item.id} className="flex items-center justify-between py-2">
              <div>
                <div className="font-semibold">{item.product?.name}</div>
                <div>Price: {item.price}</div>
                <div>Quantity: {item.quantity}</div>
              </div>
              {index < orderItems.length - 1 && <hr className="border-gray-300 w-full my-2" />}
            </div>
          ))}
        </div> */}
        </div>
        <br/>
        <br/><br/>
        <br/>
      </div>
    </div>
  );
};

export default withAuthorization(OrderDetails, CUSTOMER_ROLE);
