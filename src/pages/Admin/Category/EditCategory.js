import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { toast }from "react-toastify";
import axios from "axios";
import { BASE_URL, ADMIN_ROLE } from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";

const EditCategory = () => {

  const { id } = useParams(); // Extract category ID from URL params

  // ============= Initial State Start here =============
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errName, setErrName] = useState("");
  const [errDescription, setErrDescription] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

 // Fetch category details based on ID when component mounts
 useEffect(() => {
  const fetchCategoryDetails = async () => {
    try {
      // Make an HTTP GET request to fetch category details by ID
      const response = await axios.get(`${BASE_URL}/api/admin/categories/${id}`);
      const category = response.data; // Assuming response.data contains category details
      
      // Populate name and description fields with fetched data
      setName(category.name);
      setDescription(category.description);

    } catch (error) {
      console.error("Error fetching category details:", error);
      // Handle error, e.g., display an error toast or navigate back
      toast.error("Error fetching category details. Please try again later.");

      navigate("/admin/category"); // Navigate back to category management page
    }
  };

  fetchCategoryDetails(); // Call the fetchCategoryDetails function
}, [id, navigate]);


  const handleName = (e) => {
    setName(e.target.value);
    setErrName("");
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setErrDescription("");
  };
  // ============= Event Handler End here ===============
  const handleUpdateCategory = async(e) => {
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
  
        const response = await axios.put(`${BASE_URL}/api/admin/categories/update/${id}`, formData);
        const data = response.data;
  
        // Store category ID in session storage
        //sessionStorage.setItem("categoryId", data.id);
  
        // Display success message
        toast.success(`Category "${name}" updated successfully.`);
  
        // Clear form fields
        setName("");
        setDescription("");
  
        // Redirect to admin page after success
        navigate("/admin/category");

      } catch (error) {
        console.error("Error:", error);
        // Display error message
        toast.error("An error occurred while updating the category.");
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
              onClick={handleUpdateCategory}
              className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              >
              Update Category
            </button>

            <br/><br/>
          </div>
        </div>
      </form>
      </div>
     
    </div>
  );
};

export default withAuthorization(EditCategory,[ADMIN_ROLE]);
