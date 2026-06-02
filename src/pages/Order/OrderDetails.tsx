// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import apiClient from "@/store/apiClient";
import { toast } from "sonner";
import { shipOrder, deliverOrder, paymentOrder, spinnerOrder } from "../../assets/images";
import { BASE_URL } from "../../constants/config";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderItems = async (orderId) => {
      try {
        const response = await apiClient.get(
          `${BASE_URL}/api/customer/order-items/order/${orderId}`
        );
        setOrderItems(response.data || []);
      } catch {
        toast.error("Failed to fetch order items.");
      }
    };

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderDetailsResponse = await apiClient.get(
          `${BASE_URL}/api/customer/orders/${id}`
        );
        const orderDetails = orderDetailsResponse.data;
        if (!orderDetails) {
          toast.error("Order not found.");
          return;
        }
        setOrder(orderDetails);
        await fetchOrderItems(id);
      } catch {
        toast.error("Failed to fetch order.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-container mx-auto px-4 py-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="Order Details" />

          {Object.keys(order).length !== 0 ? (
            <div className="mx-auto max-w-3xl">
              <div className="grid grid-cols-2 gap-4 px-4">
                <div className="col-span-1">
                  <div className="text-sm font-semibold border-b border-gray-300"></div>
                </div>
              </div>

              <div className="mt-6 space-y-2 px-4 text-sm">
                <p>
                  <span className="font-semibold">Tracking ID:</span> {order.trackingId}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {order.status}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {order.address}
                </p>
                <p>
                  <span className="font-semibold">City:</span> {order.city}
                </p>
                <p>
                  <span className="font-semibold">Total:</span> {order.totalAmount} Rwf
                </p>
              </div>

              <div className="mt-8 px-4">
                <h2 className="text-lg font-semibold mb-4">Order items</h2>
                {orderItems.length > 0 ? (
                  <ul className="space-y-2">
                    {orderItems.map((item) => (
                      <li key={item.id} className="border rounded-md p-3 text-sm">
                        Product: {item.productId} — Qty: {item.quantity} — Price:{" "}
                        {item.price} Rwf
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">No items for this order.</p>
                )}
              </div>

              <div className="flex justify-center gap-4 py-8">
                <img src={shipOrder} alt="Shipped" className="w-12 h-12" />
                <img src={paymentOrder} alt="Payment" className="w-12 h-12" />
                <img src={spinnerOrder} alt="Processing" className="w-12 h-12" />
                <img src={deliverOrder} alt="Delivered" className="w-12 h-12" />
              </div>
            </div>
          ) : (
            <p className="px-4 py-8 text-center text-gray-600">Order not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
