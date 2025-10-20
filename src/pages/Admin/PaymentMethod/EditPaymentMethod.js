import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; 
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { toast }from "react-toastify";
import axios from "axios";
import { BASE_URL,ADMIN_ROLE } from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";

const EditPaymentMethod = () => {

  const { id } = useParams(); // Extract category ID from URL params

  // ============= Initial State Start here =============
  const [name, setName] = useState("");
  const [errName, setErrName] = useState("");
  const navigate = useNavigate();

  // Fetch payment details based on ID when component mounts
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        // Make an HTTP GET request to fetch payment details by ID
        const response = await axios.get(`${BASE_URL}/api/admin/payments/${id}`);
        const payment = response.data; // Assuming response.data contains payment details
        
        // Populate name  field with fetched data
        setName(payment.paymentMethod);

      } catch (error) {
        console.error("Error fetching payment details:", error);
        // Handle error, e.g., display an error toast or navigate back
        toast.error("Error fetching payment details. Please try again later.");

        navigate("/admin/payment-method"); // Navigate back to payment management page
      }
    };

    fetchPaymentDetails(); // Call the fetchPaymentDetails function
  }, [id, navigate]);



  const handleName = (e) => {
    setName(e.target.value);
    setErrName("");
  };

  // ============= Event Handler End here ===============
  const handleUpdatePayment =  async(e) => {
    e.preventDefault();

    if (!name) {
      setErrName("Enter Payment Method name");
    }

    // If name is provided
    if (name ) {
      
      try {
        const formData = {
          user: {
            id: sessionStorage.getItem('sessionId')
          },
          paymentMethod: name
        };
  
        const response = await axios.put(`${BASE_URL}/api/admin/payments/update/${id}`, formData);
        const data = response.data;
  
        // Display success message
        toast.success(`Payment Method "${name}" updated successfully.`);

  
        // Clear form field
        setName("");
  
        // Redirect to admin page after success
        navigate("/admin/payment-method");
      } catch (error) {
        console.error("Error:", error);
        // Display error message
        toast.error("An error occurred while updating the payment method.");
      }
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
       <div className="mb-4"> {/* Add margin bottom */}
        <Breadcrumbs title="Update category" />
      </div>
      <div className="w-full lgl:w-1/2 mx-auto">
        <form className="w-full flex items-center justify-center">
            <div className="px-6 py-0 w-full h-auto flex flex-col justify-center">
    
          <div className="flex flex-col gap-3">
            {/* Name */}
            <div className="flex flex-col gap-.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                 Payment Method Name
              </p>
              <input
                onChange={handleName}
                value={name}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="text"
                placeholder="Enter category name"
              />
              {errName && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errName}
                </p>
              )}
            </div>

            <button
              onClick={handleUpdatePayment}
              className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              >
              Update Payment Method
            </button>

            <br/><br/>
          </div>
        </div>
      </form>
      </div>
     
    </div>
  );
};

export default withAuthorization(EditPaymentMethod,[ADMIN_ROLE]);
