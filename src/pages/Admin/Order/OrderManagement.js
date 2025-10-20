import React, { useEffect, useState,useContext } from "react";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import Flex from "../../../components/designLayouts/Flex";
import { FaSearch } from "react-icons/fa";
import { BsEye, BsX } from "react-icons/bs"; 
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL,ADMIN_ROLE } from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";
import { AppContext } from "../../../context/AppContext";
const CustomTable = ({ data, onDelete, onDispatch, onCancel, onComplete }) => {
  
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [itemIdToCancel, setItemIdToCancel] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const [showDetailsAlert, setShowDetailsAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const handleCancel = (id) => {
    setShowCancelDialog(true);
    setItemIdToCancel(id);
  };

  const confirmCancel = () => {
    onCancel(itemIdToCancel);
    setShowCancelDialog(false);
    setItemIdToCancel(null);
  };

  const notCancel = () => {
    setShowCancelDialog(false);
    setItemIdToCancel(null);
  };


  const handleDelete = (id) => {
    setShowDeleteDialog(true);
    setItemIdToDelete(id);
  };

  const confirmDelete = () => {
    onDelete(itemIdToDelete);
    setShowDeleteDialog(false);
    setItemIdToDelete(null);
  };

  const notDelete = () => {
    setShowDeleteDialog(false);
    setItemIdToDelete(null);
  };

  const openDetailsAlert = (item) => {
    setSelectedItem(item);
    setShowDetailsAlert(true);
  };

  const closeDetailsAlert = () => {
    setSelectedItem(null);
    setShowDetailsAlert(false);
  };

  return (
    <div>
      {showCancelDialog&& (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to cancel this order?
            </p>
            <div className="flex justify-end">
              <button
                onClick={confirmCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel order
              </button>
              <button
                onClick={notCancel}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
              >
                Don't cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-end">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Delete order
              </button>
              <button
                onClick={notDelete}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
              >
                Don't delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsAlert && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">Order Details</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
              <div className="text-sm font-semibold border-b border-gray-300"></div>
                <div className="text-sm text-gray-500 ">Tracking ID:</div>
                
                <div className="text-sm text-gray-500 ">User:</div>
              
                <div className="text-sm text-gray-500 ">Address:</div>
                
                <div className="text-sm text-gray-500 ">City:</div>
               
                <div className="text-sm text-gray-500 ">Amount:</div>
                
                <div className="text-sm text-gray-500 ">Date:</div>

                <div className="text-sm text-gray-500 ">Payment method:</div>
            
                <div className="text-sm font-semibold border-b border-gray-300">Status:</div>
                
              </div>
              <div className="col-span-1 border-l pl-4">
                <div className="text-sm border-b border-gray-300"></div>
                <div className="text-sm text-gray-900">{selectedItem.trackingId}</div>
                <div className="text-sm text-gray-900">{selectedItem.user.username}</div>
                <div className="text-sm text-gray-900">{selectedItem.address}</div>
                <div className="text-sm text-gray-900">{selectedItem.city}</div>
                <div className="text-sm text-gray-900">{selectedItem.totalAmount} RWF</div>
                <div className="text-sm text-gray-900">{new Date(selectedItem.orderDate).toLocaleString()}</div>
                <div className="text-sm text-gray-900">{selectedItem.paymentMethod.paymentMethod}</div>
                <div className="text-sm border-b border-gray-300">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedItem.status === "PENDING"
                        ? "bg-yellow-100  text-yellow-800"
                        : selectedItem.status === "DISPATCHED"
                        ? "bg-green-100 text-green-800"
                        :  selectedItem.status === "CANCELED"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >{selectedItem.status}
                  </span>
                  </div>
              </div>
            </div>
            <button
              onClick={closeDetailsAlert}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

<div className="pb-20">
      <div className="hidden md:block">
        {/* Table for desktop */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking ID
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((order) => (
              <tr key={order.id}>
                 <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{order.trackingId}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{order.user.username}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{order.address}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{order.city}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{order.totalAmount} Rwf</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{new Date(order.orderDate).toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{order.paymentMethod.paymentMethod}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "DISPATCHED"
                        ? "bg-green-100 text-green-800"
                        : order.status === "CANCELED"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => openDetailsAlert(order)}
                    className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2"
                  >
                    <BsEye className="text-xl inline-block" />
                  </button>

                  {order.status === "PENDING" && (
                    <button
                      onClick={() => onDispatch(order.id)}
                      className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                    >
                      <FaTruck className="text-xl inline-block" />
                    </button>
                  )}

                  {order.status === "DISPATCHED" && (
                    <button
                      onClick={() => onComplete(order.id)}
                      className="w-20 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md mr-2"
                    >
                      <FaShippingFast className="text-xl inline-block" />
                    </button>
                  )}

                  {order.status === "CANCELED" && (
                    <button
                      onClick={() => onDispatch(order.id)}
                      className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                    >
                      <FaTruck className="text-xl inline-block" />
                    </button>
                  )}

                  {order.status === "COMPLETED" && (
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                    >
                      <RiDeleteBin6Line className="text-xl inline-block" />
                    </button>
                  )}

                  {order.status !== "COMPLETED" && order.status !== "CANCELED" && (
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                    >
                      <BsX className="text-xl inline-block" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {/* Cards for tablets and phones */}
        {data.map((order) => (
          <div key={order.id} className="my-4 p-4 bg-white rounded-md border border-gray-300">
            <p className="text-sm font-medium text-gray-900">Tracking ID: {order.trackingId}</p>
            <p className="text-sm text-gray-600">User: {order.user.username}</p>
            <p className="text-sm text-gray-600">Address: {order.address}</p>
            <p className="text-sm text-gray-600">City: {order.city}</p>
            <p className="text-sm text-gray-600">Amount: {order.totalAmount} Rwf</p>
            <p className="text-sm text-gray-600">Date: {new Date(order.orderDate).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Payment: {order.paymentMethod.paymentMethod}</p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "DISPATCHED"
                    ? "bg-green-100 text-green-800"
                    : order.status === "CANCELED"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {order.status}
              </span>
            </p>
            <div className="mt-2 flex justify-start items-center">
              <button
                onClick={() => openDetailsAlert(order)}
                className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2"
              >
                <BsEye className="text-xl inline-block" />
              </button>

              {order.status === "PENDING" && (
                <button
                  onClick={() => onDispatch(order.id)}
                  className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                >
                  <FaTruck className="text-xl inline-block" />
                </button>
              )}

              {order.status === "DISPATCHED" && (
                <button
                  onClick={() => onComplete(order.id)}
                  className="w-20 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md mr-2"
                >
                  <FaShippingFast className="text-xl inline-block" />
                </button>
              )}

              {order.status === "CANCELED" && (
                <button
                  onClick={() => onDispatch(order.id)}
                  className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                >
                  <FaTruck className="text-xl inline-block" />
                </button>
              )}

              {order.status === "COMPLETED" && (
                <button
                  onClick={() => handleDelete(order.id)}
                  className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                >
                  <RiDeleteBin6Line className="text-xl inline-block" />
                </button>
              )}

              {order.status !== "COMPLETED" && order.status !== "CANCELED" && (
                <button
                  onClick={() => handleCancel(order.id)}
                  className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                >
                  <BsX className="text-xl inline-block" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
      {/* <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tracking ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Address
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            City
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Payment
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((order) => (
            <tr key={order.id} className="text-sm text-gray-800">
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.trackingId}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.user.username}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.address}</div>
                </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.city}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.totalAmount} Rwf</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{new Date(order.orderDate).toLocaleString()}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.paymentMethod.paymentMethod}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === "PENDING"
                      ? "bg-yellow-100  text-yellow-800"
                      : order.status === "DISPATCHED"
                      ? "bg-green-100  text-green-800"
                      :  order.status === "CANCELED"
                      ? "bg-red-100  text-red-800"
                      : "bg-blue-100  text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
                
                </td>
              <td className="px-2 py-4 text-sm font-medium">
                <button
                  onClick={() => openDetailsAlert(order)}
                  className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2 "
                >
                  <BsEye className="text-xl inline-block" />
                </button>

                {order.status === "PENDING" && (
                  <button
                    onClick={() => onDispatch(order.id)}
                    className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                  >
                    <FaTruck className="text-xl inline-block" />
                  </button>
                )}

                {order.status === "DISPATCHED" && (
                  <button
                    onClick={() => onComplete(order.id)}
                    className="w-20 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md mr-2"
                  >
                    <FaShippingFast className="text-xl inline-block" />
                  </button>
                )}

                {order.status === "CANCELED" && (
                  <button
                    onClick={() => onDispatch(order.id)}
                    className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-20"
                  >
                   <FaTruck className="text-xl inline-block" />
                  </button>
                )}

                {order.status === "COMPLETED" && (
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                  >
                    <RiDeleteBin6Line  className="text-xl inline-block" />
                  </button>
                )}

                {order.status !== "COMPLETED" && order.status !== "CANCELED" && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                  >
                    <BsX className="text-xl inline-block" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};


const OrderManagement = () => {

  // const {adminOrders, filteredAdminOrders } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredorders, setFilteredorders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    // Fetch orders from the backend API
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/orders`);
        setOrders(response.data);
        setFilteredorders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/orders/delete/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
      setFilteredorders(filteredorders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    if (query === "") {
      setFilteredorders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.trackingId.toLowerCase().includes(query.toLowerCase()) 
      );
      setFilteredorders(filtered);
       // Reset the status filter when a search query is entered
      setStatusFilter("");
      setCurrentPage(1); // Reset current page when searching
    }
  };

  const handleStatusFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    // Filter orders based on both search query and selected status
    const filtered = orders.filter((order) => {
      const matchesSearchQuery = order.trackingId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === "" || order.status === selectedStatus;
      return matchesSearchQuery && matchesStatus;
    });

    setFilteredorders(filtered);
    
  };

  const handleDispatch = async (id) => {
    try {
      // Call API to update order status to "DISPATCHED"
      let updatedStatus = "DISPATCHED";
      const response = await axios.put(`${BASE_URL}/api/admin/orders/update/${id}`, 
        { 
          status: updatedStatus
        }
      );
      // Update the local state to reflect the change
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status: response.data.status } : order
      );
      setOrders(updatedOrders);
      setFilteredorders(updatedOrders);
      setSearchQuery("");
      setStatusFilter("");
    } catch (error) {
      console.error("Error dispatching order:", error.message);
      toast.error("Error dispatching order");
    }
  };

  const handleCancel = async (id) => {
    try {
      // Call API to update order status to "CANCELED"
      let updatedStatus = "CANCELED";
      const response =  await axios.put(`${BASE_URL}/api/admin/orders/update/${id}`,
        {
          status: updatedStatus 
        }
      );
      // Update the local state to reflect the change
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status:response.data.status} : order
      );
      setOrders(updatedOrders);
      setFilteredorders(updatedOrders);
      setSearchQuery("");
      setStatusFilter("");
    } catch (error) {
      console.error("Error canceling order:", error.message);
      toast.error("Error canceling order");
    }
  };

  const handleComplete = async (id) => {
    try {
      // Call API to update order status to "COMPLETED"
      let updatedStatus = "COMPLETED";
      const response = await axios.put(`${BASE_URL}/api/admin/orders/update/${id}`,
        { 
          status: updatedStatus 
        }
      );
      // Update the local state to reflect the change
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status: response.data.status} : order
      );
      setOrders(updatedOrders);
      setFilteredorders(updatedOrders);
      setSearchQuery("");
      setStatusFilter("");
    } catch (error) {
      console.error("Error completing order:", error.message);
      toast.error("Error completing order");
    }
  };


  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredorders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredorders.length / ordersPerPage)) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-container mx-auto px-4 bg-[#F5F5F3]">
    <Breadcrumbs title="Orders"/>

    <div className="max-w-container mx-auto">
      <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
        
        <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
          <input
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="text"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Search your customer's order here"
          />
          <FaSearch className="w-5 h-5" />

        </div>
        <div className="relative mt-4 lg:mt-0">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
            >
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="DISPATCHED">Dispatched</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELED">Canceled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                />
              </svg>
            </div>
          </div>
      </Flex>
    </div>
    {/* ================= Orders Start here =================== */}
      < CustomTable 
        data={currentOrders}  
        onDelete={handleDelete}
        onDispatch={handleDispatch}
        onCancel={handleCancel}
        onComplete={handleComplete}
      />

    {/* ================= Orders End here ===================== */}
    <div className="mt-4">
        <nav aria-label="Page navigation">
          <ul className="flex justify-center space-x-1">
            <li className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
              <button
                className="px-3 py-1 rounded-l-md bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: Math.ceil(filteredorders.length / ordersPerPage) }, (_, i) => (
              <li key={i + 1} className={`${currentPage === i + 1 ? "bg-[#FF8533] text-white" : "bg-gray-200"} px-3 py-1 rounded-md cursor-pointer transition-colors text-white hover:bg-[#FF6A00]`}>
                <button onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`${currentPage === Math.ceil(filteredorders.length / ordersPerPage) ? "opacity-50 cursor-not-allowed" : ""}`}>
              <button
                className="px-3 py-1 rounded-r-md bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(filteredorders.length / ordersPerPage)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <br/>
      <br/>
  </div>
  );
};

export default withAuthorization(OrderManagement, [ADMIN_ROLE]);
