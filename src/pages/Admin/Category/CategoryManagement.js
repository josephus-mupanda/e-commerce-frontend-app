
import React, { useState,useEffect } from "react";
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
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [categoryIdToView, setCategoryIdToView] = useState(null);

  const navigate  = useNavigate();

  const handleDelete = (id) => {
    setShowDeleteDialog(true);
    setCategoryIdToDelete(id);
  };

  const confirmDelete = () => {
    onDelete(categoryIdToDelete);
    setShowDeleteDialog(false);
    setCategoryIdToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setCategoryIdToDelete(null);
  };

  const handleViewDetails = (category) => {
     setShowDetailsDialog(true);
     setCategoryIdToView(category);
  };

  const cancelView = () => {
    setShowDetailsDialog(false);
    setCategoryIdToView(null);
    
  };

  const confirmEdit = () => {
    
    setShowDetailsDialog(false);
    setCategoryIdToView(null);
    // Navigate to update category page
    navigate(`/admin/update-category/${categoryIdToView.id}`);
  };

  return (
    <div>
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-end">
              <button
                onClick={confirmDelete}
                className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="w-20 h-8 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md mr-2"
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
              Category Details
            </p>
            <p>ID: {categoryIdToView.id}</p>
            <p>Name: {categoryIdToView.name}</p>
            <p>Description: {categoryIdToView.description}</p>
            <br/>
            <div className="flex justify-end">
              <button
                onClick={() => confirmEdit(categoryIdToView)}
                className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={cancelView}
                className="w-20 h-8 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md mr-2"
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
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((category) => (
                <tr key={category.id} className="text-sm text-gray-800">
                  <td className="py-2 px-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{category.id}</div>
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{category.name}</div>
                  </td>
                  <td className="py-2 px-4">
                    <div className="text-sm text-gray-900">{category.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <Link to={`/admin/update-category/${category.id}`}>
                      <button 
                      className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleViewDetails(category)}
                      className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
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
          {data.map((category) => (
            <div key={category.id} className="my-4 p-4 bg-white rounded-md border border-gray-300">
              <p className="text-sm font-medium text-gray-900">ID: {category.id}</p>
              <p className="text-sm text-gray-600">Name: {category.name}</p>
              <p className="text-sm text-gray-600">Description: {category.description}</p>
              <div className="mt-2 flex justify-start items-center">
                <Link to={`/admin/update-category/${category.id}`}>
                  <button 
                  className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleViewDetails(category)}
                  className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((category) => (
            <tr key={category.id} className="text-sm text-gray-800">
               <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{category.id}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{category.name}</div>
              </td>
              <td className="py-2 px-4 ">
                <div className="text-sm text-gray-900">{category.description}</div>
              </td>
              <td className="px-6 py-4  text-sm font-medium">

                <Link to={`/admin/update-category/${category.id}`}>
                  <button 
                  className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleViewDetails(category)}
                  className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                >
                  View
                </button>

                <button
                  onClick={() => handleDelete(category.id)}
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

const CategoryManagement = () => {

  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(3);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/categories`);
        setCategories(response.data);
        setFilteredCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/categories/delete/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      setFilteredCategories(filteredCategories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(
        (category) =>
          category.name.toLowerCase().includes(query.toLowerCase()) ||
          category.id.toString().includes(query)
      );
      setFilteredCategories(filtered);
    }
  };



  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCategories.length / categoriesPerPage))
      setCurrentPage(currentPage + 1);
  };


  return (
   
    <div className="max-w-container mx-auto px-4 bg-[#F5F5F3]">
    <Breadcrumbs title="Categories" />

    <div className="max-w-container mx-auto">
      <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
        
        <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
          <input
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="text"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Search your category here"
          />
          <FaSearch className="w-5 h-5" />
        
        </div>
        <Link to="/admin/create-category">
          <button  
          className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white cursor-pointer w-full text-base font-medium w-52 h-10 rounded-md  duration-300"
          >
            Create category
          </button>
        </Link>

      </Flex>
    </div>
    {/* ================= Categories Start here =================== */}
    <CustomTable data={currentCategories}  onDelete={handleDelete} />
    {/* ================= Categories End here ===================== */}

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
            {Array.from({ length: Math.ceil(filteredCategories.length / categoriesPerPage) }, (_, i) => (
              <li key={i + 1} className={`${currentPage === i + 1 ? "bg-[#FF8533]  text-white" : "bg-gray-200"} px-3 py-1 rounded-md cursor-pointer transition-colors text-white hover:bg-[#FF6A00]`}>
                <button onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`${currentPage === Math.ceil(filteredCategories.length / categoriesPerPage) ? "opacity-50 cursor-not-allowed" : ""}`}>
              <button
                className="px-3 py-1 rounded-r-md bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(filteredCategories.length / categoriesPerPage)}
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

export default withAuthorization(CategoryManagement,[ADMIN_ROLE]);
