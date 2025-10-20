import React ,{ useState, useEffect } from "react";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { Link ,useNavigate} from "react-router-dom";
import Flex from "../../../components/designLayouts/Flex";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { BASE_URL, ADMIN_ROLE } from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";
// Customized table component
const CustomTable = ({ data , onDelete }) => {

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [productIdToView, setProductIdToView] = useState(null);


  const navigate = useNavigate();

  const handleDelete = (id) => {
    setShowDeleteDialog(true);
    setProductIdToDelete(id);
  };

  const confirmDelete = () => {
    onDelete(productIdToDelete);
    setShowDeleteDialog(false);
    setProductIdToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setProductIdToDelete(null);
  };

  const handleViewDetails = (product) => {
    setShowDetailsDialog(true);
    setProductIdToView(product);
  };

  const cancelView = () => {
    setShowDetailsDialog(false);
    setProductIdToView(null);
  };

  const confirmEdit = () => {
    setShowDetailsDialog(false);
    setProductIdToView(null);
    // Navigate to update product page
    navigate(`/admin/update-product/${productIdToView.id}`);
  };



  return (
    <div>
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this product?
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

      {showDetailsDialog && ( // Added
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Product Details
            </p>
            <p>ID: {productIdToView.id}</p>
            <p>Name: {productIdToView.name}</p>
            <p>Description: {productIdToView.description}</p>
            <p>Price: {productIdToView.price}</p>
            <p>Quantity: {productIdToView.quantity}</p>
            <p>Category: {productIdToView.category}</p>
            
            <img
              src={`data:image/jpeg;base64,${productIdToView.image}`}
              alt={productIdToView.name}
              className="w-16 h-16 object-cover"
            />

            {/* <img src={productIdToView.image} alt={productIdToView.name} className="w-16 h-16 object-cover" />
             */}
            <br />
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
                Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{product.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{product.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{product.price} RWF</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{product.quantity}</div>
                </td>
                <td className="px-6 py-4">
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{product.category.name}</div>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/admin/update-product/${product.id}`}>
                    <button className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleViewDetails(product)}
                    className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
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
        {data.map((product) => (
          <div key={product.id} className="my-4 p-4 bg-white rounded-md border border-gray-300">
            <p className="text-sm font-medium text-gray-900">ID: {product.id}</p>
            <p className="text-sm text-gray-600">Name: {product.name}</p>
            <p className="text-sm text-gray-600">Description: {product.description}</p>
            <p className="text-sm text-gray-600">Price: {product.price} RWF</p>
            <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
            <div className="my-2">
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name}
                className="w-32 h-32 object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">Category: {product.category.name}</p>
            <div className="mt-2 flex justify-start items-center">
              <Link to={`/admin/update-product/${product.id}`}>
                <button className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleViewDetails(product)}
                className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(product.id)}
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
          Price
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Quantity
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Image
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Category
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((product) => (
          <tr key={product.id} className="text-sm text-gray-800">
            <td className="py-2 px-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.id}</div>
            </td>
            <td className="py-2 px-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.name}</div>
            </td>
            <td className="py-2 px-4 ">
              <div className="text-sm text-gray-900">{product.description}</div>
            </td>
            <td className="py-2 px-4">
              <div className="text-sm text-gray-900">{product.price}RWF</div>
            </td>
            <td className="py-2 px-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.quantity}</div>
            </td>
            <td className="py-2 px-4 whitespace-nowrap">
              <img
                  src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name}
                className="w-16 h-16 object-cover"
              />
            </td>
            <td className="py-2 px-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.category.name}</div>
            </td>
            <td className="py-2 px-4">

              <Link to={`/admin/update-product/${product.id}`}>
                <button className="w-20 h-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md mr-2">
                  Edit
                </button>
              </Link>
              
              <button
                  onClick={() => handleViewDetails(product)}
                  className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                >
                  View
              </button>

              <button
               onClick={() => handleDelete(product.id)} 
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

const ProductManagement = () => {

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/products/delete/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.id.toString().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) setCurrentPage(currentPage + 1);
  };


  return (
    <div className="max-w-container mx-auto px-4 bg-[#F5F5F3]">
      <Breadcrumbs title="Products" />

      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
          
          </div>
          <Link to="/admin/create-product">
            <button 
            className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white cursor-pointer w-full text-base font-medium w-52 h-10 rounded-md  duration-300"
            >
              Create product
            </button>
          </Link>

        </Flex>
      </div>
      {/* ================= Products Start here =================== */}
      <CustomTable data={currentProducts}  onDelete={handleDelete} />
      {/* ================= Products End here ===================== */}

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
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
              <li key={i + 1} className={`${currentPage === i + 1 ? "bg-[#FF8533] text-white" : "bg-gray-200"} px-3 py-1 rounded-md cursor-pointer transition-colors text-white hover:bg-[#FF6A00]`}>
                <button onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`${currentPage === Math.ceil(filteredProducts.length / productsPerPage) ? "opacity-50 cursor-not-allowed" : ""}`}>
              <button
                className="px-3 py-1 rounded-r-md bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
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

export default withAuthorization(ProductManagement,[ADMIN_ROLE]);
