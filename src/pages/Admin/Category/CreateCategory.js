import React, { useState } from "react";
import {useNavigate } from "react-router-dom"; 
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL ,ADMIN_ROLE} from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";

const CreateCategory = () => {
  // ============= Initial State Start here =============
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errName, setErrName] = useState("");
  const [errDescription, setErrDescription] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
    setErrName("");
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setErrDescription("");
  };
  // ============= Event Handler End here ===============
  const handleCreateCategory = async(e) => {
    e.preventDefault();

    if (!name) {
      setErrName("Enter category name");
    }

    if (!description) {
      setErrDescription("Enter category description");
    }

    // If both name and description are provided
    if (name && description) {
      try {
        const formData = {
          user: {
            id: sessionStorage.getItem('sessionId')
          },
          name: name,
          description: description
        };
  
        const response = await axios.post(`${BASE_URL}/api/admin/categories/create`, formData);
        const data = response.data;
  
        // Store category ID and user details in session storage
        sessionStorage.setItem("categoryId", data.id);
        //sessionStorage.setItem("user", JSON.stringify(data.user));
  
        // Display success message
        toast.success(`Category "${name}" created successfully.`);
  
        // Clear form fields
        setName("");
        setDescription("");
  
        // Redirect to admin page after success
        navigate("/admin/category");

      } catch (error) {
        console.error("Error:", error);
        // Display error message
        toast.error("An error occurred while creating the category.");
      }
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
       <div className="mb-4"> {/* Add margin bottom */}
        <Breadcrumbs title="Create category" />
      </div>
      <div className="w-full lgl:w-1/2 mx-auto">
        <form className="w-full flex items-center justify-center">
          <div className="px-6 py-0 w-full h-auto flex flex-col justify-center">
    
          <div className="flex flex-col gap-3">
            {/* Name */}
            <div className="flex flex-col gap-.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Category Name
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

            {/* Description */}
            <div className="flex flex-col gap-.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Description
              </p>
              <textarea
                onChange={handleDescription}
                value={description}
                className="w-full h-20 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none resize-none"
                placeholder="Enter category description"
              ></textarea>
              {errDescription && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errDescription}
                </p>
              )}
            </div>

            <button
              onClick={handleCreateCategory}
              className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              >
              Create Category
            </button>
            <br/><br/>
          </div>
        </div>
      </form>
      </div>
     
    </div>
  );
};

export default withAuthorization(CreateCategory,[ADMIN_ROLE]);
