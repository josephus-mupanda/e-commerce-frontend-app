import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL,ADMIN_ROLE } from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";
const CreatePaymentMethod = () => {
  
    // ============= Initial State Start here =============
  const [name, setName] = useState("");
  const [errName, setErrName] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
    setErrName("");
  };

  // ============= Event Handler End here ===============
  const handleCreatePayment = async (e) => {
    e.preventDefault();

    if (!name) {
      setErrName("Enter payment method name");
    }

    try {
      const formData = {
        user: {
          id: sessionStorage.getItem('sessionId')
        },
        paymentMethod: name
      };

      const response = await axios.post(`${BASE_URL}/api/admin/payments/create`, formData);
      const data = response.data;

      // Display success message
      //setSuccessMsg(`Payment Method "${name}" created successfully.`);
      toast.success(`Payment Method "${name}" created successfully.`);

      // Store payment ID in session storage
      sessionStorage.setItem("paymentId", data.id);

      // Clear form field
      setName("");

      // Redirect to admin page after success
      navigate("/admin/payment-method");
    } catch (error) {
      console.error("Error:", error);
      // Display error message
      toast.error("An error occurred while creating the payment method.");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
       <div className="mb-4"> {/* Add margin bottom */}
        <Breadcrumbs title="Create Payment Method" />
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
                placeholder="Enter method name"
              />
              {errName && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errName}
                </p>
              )}
            </div>

            <button
              onClick={handleCreatePayment}
              className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white  cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
            >
              Create Payment Method
            </button>
            <br/><br/>
          </div>
        </div>
      </form>
      </div>
     
    </div>
  );
};

export default withAuthorization(CreatePaymentMethod,[ADMIN_ROLE]);
