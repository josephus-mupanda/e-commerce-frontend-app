import React, { useEffect, useState } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { emptyCart } from "../../assets/images/index";
import { toast } from "react-toastify";
import Flex from "../../components/designLayouts/Flex";
import { FaSearch } from "react-icons/fa";
import { BsEye, BsX } from "react-icons/bs"; 
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";
import { BASE_URL , CUSTOMER_ROLE} from "../../constants/config";
import withAuthorization from "../../constants/hoc/withAuthorization";
import axios from "axios";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
const Order = () => {

  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [itemIdToCancel, setItemIdToCancel] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredorders, setFilteredorders] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

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

  useEffect(() => {
    setPrevLocation(location.state.data);
    fetchOrders();
  }, [location]);

  
  // useEffect(() => {

  //   setPrevLocation(location.state.data);
  //   checkLoggedIn(); // Check if the user is logged in
  //   if (loggedIn) {
  //     fetchOrders(); 
  //   }

  // }, [location,loggedIn]);

  const fetchOrders = async () => {
    try {
      setLoading(true); // Set loading state to true
      const userId = sessionStorage.getItem('sessionId'); // Assuming sessionId is the user ID
      const response = await axios.get(`${BASE_URL}/api/customer/orders/user/${userId}`);
      setOrders(response.data);
      setFilteredorders(response.data);
      setLoading(false); // Set loading state to false after fetching orders
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
      setLoading(false); //  Set loading state to false on error
    }
  };

  // const checkLoggedIn = () => {
  //   // Check if user is logged in
  //   const isLoggedIn = sessionStorage.getItem("sessionId") !== null;
  //   setLoggedIn(isLoggedIn);
  // };



  const navigate = useNavigate();

  // -------------------------------onCancel
  const onCancel = async (id) => {
    try {
      // Call API to update order status to "CANCELED"
      let updatedStatus = "CANCELED";
      const response =  await axios.put(`${BASE_URL}/api/customer/orders/update/${id}`,
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
      toast.error("Error canceling order");
    }
  };

  // ------------------CANCEL ------------------------
  const handleCancelOrder = (id) => {
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

  //------------------------ onDelete -------------------
  const onDelete = async (id) => {

    try {
      await axios.delete(`${BASE_URL}/api/customer/orders/delete/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
      setFilteredorders(filteredorders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  // ----------------------DELETE ---------------------
  const handleDeleteorder = (id) => {
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

  const handleViewOrder = (rootId) => {
    navigate(`/order/${rootId}`);
  };

  const handleReplaceOrder = async(id) =>{
    try {
      // Call API to update order status to "PENDING"
      let updatedStatus = "PENDING";
      const response =  await axios.put(`${BASE_URL}/api/customer/orders/update/${id}`,
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
      toast.error("Error replacing order");
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


  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Orders" prevLocation={prevLocation} />
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
      {orders.length > 0 ? (
        <div className="max-w-container mx-auto">
          <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
            
            <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor border border-gray-300 text-gray-700 flex items-center gap-2 justify-between px-6 rounded-xl">
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
          {/* Order list */}
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
                      Address
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
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
                  {currentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.trackingId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.address}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.city}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.totalAmount} RWF</div>
                      </td>
                      <td className="px-6 py-4 ">
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
                          onClick={() => handleViewOrder(order.id)}
                          className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2 duration-300 mr-2"
                        >
                          <BsEye className="text-xl inline-block" />
                        </button>

                        {order.status === "CANCELED" && (
                          <button
                            onClick={() => handleReplaceOrder(order.id)}
                            className="w-8 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md mr-2 duration-300 mr-2"
                          >
                            <BsArrowRepeat className="text-xl inline-block"/>
                          </button>
                        )}

                        {order.status === "COMPLETED" && (
                          <button
                            onClick={() => handleDeleteorder(order.id)}
                            className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2 duration-300 mr-2"
                          >
                            <RiDeleteBin6Line  className="text-xl inline-block" />
                          </button>
                        )}

                        {order.status !== "COMPLETED" && order.status !== "CANCELED" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2 duration-300 mr-2"
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
              {currentOrders.map((order) => (
                <div key={order.id} className="my-4 p-4 bg-white rounded-md border border-gray-300">
                  {/* Customized card content */}
                  <p className="text-sm font-medium text-gray-900">Tracking ID: {order.trackingId}</p>
                  <p className="text-sm text-gray-600">Address: {order.address}</p>
                  <p className="text-sm text-gray-600">City: {order.city}</p>
                  <p className="text-sm text-gray-600">Total Amount: {order.totalAmount} RWF</p>
                  <p className="text-sm text-gray-600">Date: {new Date(order.orderDate).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod.paymentMethod}</p>
                  <p className={`text-sm font-semibold rounded-full inline px-2 leading-5 ${
                    order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "DISPATCHED"
                      ? "bg-green-100 text-green-800"
                      : order.status === "CANCELED"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    Status: {order.status}
                  </p>
                  <div className="mt-2 flex justify-start items-center">
                  <button
                          onClick={() => handleViewOrder(order.id)}
                          className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2 duration-300 mr-2"
                        >
                          View
                        </button>

                        {order.status === "CANCELED" && (
                          <button
                            onClick={() => handleReplaceOrder(order.id)}
                            className="w-20 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md mr-2 duration-300 mr-2"
                          >
                            Cancel
                          </button>
                        )}

                        {order.status === "COMPLETED" && (
                          <button
                            onClick={() => handleDeleteorder(order.id)}
                            className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2 duration-300 mr-2"
                          >
                            Delete
                          </button>
                        )}

                        {order.status !== "COMPLETED" && order.status !== "CANCELED" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2 duration-300 mr-2"
                          >
                            Cancel
                          </button>
                        )}
                  </div>
                </div>
              ))}
          </div>
      
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
                Your Order feels empty.
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
              Your order list is waiting for delicious items. Give it purpose - fill it with
              tasty dishes, refreshing beverages, and delightful desserts, and enjoy a satisfying meal.
              </p>
              <Link to="/shop">
                <button className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white rounded-md cursor-pointer active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        )
      }
    </div>
  );
};

export default withAuthorization(Order,[CUSTOMER_ROLE]);

