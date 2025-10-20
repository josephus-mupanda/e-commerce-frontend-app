
import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { Link ,useNavigate} from "react-router-dom";
import Flex from "../../../components/designLayouts/Flex";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { BASE_URL,ADMIN_ROLE } from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";
// Customized table component
const CustomTable = ({ data , onDelete }) => {

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [paymentIdToDelete, setPaymentIdToDelete] = useState(null);

  const [showDetailsDialog, setShowDetailsDialog] = useState(false); 
  const [paymentIdToView, setPaymentIdToView] = useState(null); 

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setShowDeleteDialog(true);
    setPaymentIdToDelete(id);
  };

  const confirmDelete = () => {
    onDelete(paymentIdToDelete);
    setShowDeleteDialog(false);
    setPaymentIdToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setPaymentIdToDelete(null);
  };


  const handleViewDetails = (payment) => {
    setShowDetailsDialog(true);
    setPaymentIdToView(payment);
  };

  const cancelView = () => {
    setShowDetailsDialog(false);
    setPaymentIdToView(null);
  };

  const confirmEdit = () => {
    setShowDetailsDialog(false);
    setPaymentIdToView(null);
    // Navigate to update payment method page
    navigate(`/admin/update-payment/${paymentIdToView.id}`);
  };

  return (
    <div>
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this payment method?
            </p>
            <div className="flex justify-end">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsDialog && ( 
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Payment Method Details
            </p>
            <p>ID: {paymentIdToView.id}</p>
            <p>Name: {paymentIdToView.paymentMethod}</p>
            <div className="flex justify-end">
              <button
                onClick={confirmEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={cancelView}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
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
                ID
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((payment) => (
              <tr key={payment.id} className="text-sm text-gray-800">
                <td className="py-2 px-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.id}</div>
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.paymentMethod}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/admin/update-payment/${payment.id}`}>
                    <button className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleViewDetails(payment)}
                    className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(payment.id)}
                    className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {/* Cards for tablets and phones */}
        {data.map((payment) => (
          <div key={payment.id} className="my-4 p-4 bg-white rounded-md border border-gray-300">
            <p className="text-sm font-medium text-gray-900">ID: {payment.id}</p>
            <p className="text-sm text-gray-600">Method Name: {payment.paymentMethod}</p>
            <div className="mt-2 flex justify-start items-center">
              <Link to={`/admin/update-payment/${payment.id}`}>
                <button className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleViewDetails(payment)}
                className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(payment.id)}
                className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      {/* <table  className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Method  Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((payment) => (
            <tr key={payment.id} className="text-sm text-gray-800">
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{payment.id}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{payment.paymentMethod}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/admin/update-payment/${payment.id}`}>
                  <button className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleViewDetails(payment)}
                  className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                >
                  View
                </button>

                <button
                  onClick={() => handleDelete(payment.id)}
                  className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                >
                  Delete
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>  
  );
};

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10);

  // Fetch user data from the backend when the component mounts
  useEffect(() => {

    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/payments`);
        setPayments(response.data);
        setFilteredPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error.message);
    
      }
    };

    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Send delete request to backend API
      await axios.delete(`${BASE_URL}/api/admin/payments/delete/${id}`);
      // Remove the deleted payment from the state
      setPayments(payments.filter((payment) => payment.id !== id));
      setFilteredPayments(filteredPayments.filter((payment) => payment.id !== id));
    } catch (error) {
      console.error("Error deleting payment:", error.message);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter(
        (payment) =>
          payment.paymentMethod.toLowerCase().includes(query.toLowerCase()) ||
          payment.id.toString().includes(query)
      );
      setFilteredPayments(filtered);
    }
  };


  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPayments.length / paymentsPerPage)) setCurrentPage(currentPage + 1);
  };
  return (
   
    <div className="max-w-container mx-auto px-4 bg-[#F5F5F3]">
    <Breadcrumbs title="Payment Methods" />

    <div className="max-w-container mx-auto">
      <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
        
        <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
          <input
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="text"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Search your payment method here"
          />
          <FaSearch className="w-5 h-5" />
        
        </div>
        <Link to="/admin/create-payment">
          <button 
          className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white cursor-pointer w-full text-base font-medium w-52 h-10 rounded-md  duration-300"
           >
            Create Payment Method
          </button>
        </Link>

      </Flex>
    </div>
    {/* ================= Payments Start here =================== */}
    <CustomTable data={currentPayments}  onDelete={handleDelete} />
    {/* ================= Payments End here ===================== */}

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
            {Array.from({ length: Math.ceil(filteredPayments.length / paymentsPerPage) }, (_, i) => (
              <li key={i + 1} className={`${currentPage === i + 1 ? "bg-[#FF8533] text-white" : "bg-gray-200"} px-3 py-1 rounded-md cursor-pointer transition-colors text-white hover:bg-[#FF6A00]`}>
                <button onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`${currentPage === Math.ceil(filteredPayments.length / paymentsPerPage) ? "opacity-50 cursor-not-allowed" : ""}`}>
              <button
                className="px-3 py-1 rounded-r-md bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(filteredPayments.length / paymentsPerPage)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <br/><br/>
  </div>
  );
};

export default withAuthorization(PaymentManagement, [ADMIN_ROLE]);
