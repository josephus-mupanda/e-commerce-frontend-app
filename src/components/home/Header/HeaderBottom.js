import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsSuitHeartFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../constants/config";
import { AppContext } from "../../../context/AppContext";
import LoadingSpinner from "../../Loading/LoadingSpinner";
const HeaderBottom = () => {

  const { categories, product, loading } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [showSearchBar, setShowSearchBar] = useState(false);


  // const [categories, setCategories] = useState([]);
  // const [product, setProducts] = useState([]);

  const products = useSelector((state) => state.orebiReducer.products);
  const wishlist = useSelector((state) => state.orebiReducer.wishlist);

  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const navigate = useNavigate();
  const ref = useRef();

  const refUser = useRef();
  const refUserMenu = useRef();

 
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      // Check if the click is outside of the user dropdown menu and the user icon
      if (!refUser.current.contains(e.target) && !refUserMenu.current.contains(e.target)) {
        setShowUser(false); // Close the user dropdown menu
      }
    });
  }, []);

  useEffect(() => {
    const filtered = product.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, product]);


  useEffect(() => {
    // Check if the session ID exists in sessionStorage
    const sessionId = sessionStorage.getItem("sessionId");
    const userLoggedIn = sessionId !== null && sessionId !== "";
    setIsLoggedIn(userLoggedIn);
  }, []);
 

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLoginToast = () => {
    toast.warning("Please login first to view your cart.");
  };

  const confirmLogout = async () => {
    setIsLoadingLogout(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/users/logout`, {
        id: sessionStorage.getItem('sessionId'),
        role: sessionStorage.getItem('userRole')
      });
      // Check if the logout was successful
      if (response.status === 200) {
        // Clear all values in session storage
        sessionStorage.clear();
        setIsLoggedIn(false);
        toast.success("Logging out...");
        // Navigate to shop route
        navigate("/");
      } else {
        toast.error("Logout failed");
        // Handle logout failure
      }
    } catch (error) {
      toast.error("Error occurred during logout:", error);
      // Handle error
    }finally{
      setIsLoadingLogout(false);
    }
  };

  return (

    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Order by Category</p>
            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36  z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
              >
                {categories.map((category) => (
                  <Link key={category.id} to={`/category/${category.name}`}>
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      {category.name}
                    </li>
                  </Link>
                ))}
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
              
              {/* Show skeleton loading while data is being fetched */}
              {
              !filteredProducts.length ? (
                <div className="animate-pulse">
                  {[...Array(4)].map((_, index) => (
                     <div key={index} className="max-w-[600px] h-24  bg-gray-200 mb-3 flex items-center gap-3 animate-pulse rounded">
                     <div className="w-24 h-24 bg-gray-300 animate-pulse rounded "></div>
                     <div className="flex flex-col gap-1 ">
                       {/* Placeholder for product name */}
                       <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                       {/* Placeholder for product description */}
                       <div className="w-full h-3 bg-gray-200 mb-1 rounded animate-pulse"></div>
                       {/* Placeholder for product price */}
                       <div className="w-2/3 h-3 bg-gray-200 rounded animate-pulse"></div>
                     </div>
                   </div>
                   
                  ))
                  }
                </div>
              ) : (
               
               // Render search results when data is fetched
                  filteredProducts.map((myProduct) =>{

                    const id = myProduct.name;
                    const idString = (_id) => {
                      return String(_id).toLowerCase().split(" ").join("");
                    };
                    const rootId = idString(id);

                    return  (
                      <div
                        onClick={() => {
                          console.log("Product Item:", myProduct); // Add this line to inspect the productItem object

                          // navigate(`/product/${rootId}`, {
                          //   state: {
                          //     item: myProduct,
                          //   },
                          // });
                          toast.info("This navigation will be implemented very soon, stay tuned!") ;
                          setShowSearchBar(true) ;
                          setSearchQuery("")
                        } 
                        }
                        key={myProduct.id}
                        className="max-w-[600px] h-24 bg-gray-100 mb-3 flex items-center gap-3"
                      >
                        <img 
                          className="w-24 h-24"
                          src={`data:image/jpeg;base64,${myProduct.image}`}
                          alt="productImg" 
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-lg">
                            {myProduct.name}
                          </p>
                          <p className="text-xs">
                            {myProduct.description.length > 100
                              ? `${myProduct.description.slice(0, 100)}...`
                              : myProduct.description}
                          </p>
                          <p className="text-sm">
                            Price:{" "}
                            <span className="text-primeColor font-semibold">
                              {myProduct.price} RWF
                            </span>
                          </p>
                        </div>
                      </div>
                    )  
                  }
                             
                )
              )}
              </div>
            )
            }
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            { isLoggedIn ? (
              <div  ref={refUser}  onClick={() => setShowUser(!showUser)} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white flex items-center justify-center mr-2">
                  <p className=" text-sm text-white font-semibold">{sessionStorage.getItem("username")[0].toUpperCase()}</p>
                </div>
                <p className="text-sm font-semibold">{sessionStorage.getItem("username")}</p>
                <FaCaretDown />
              </div>
            ) : (
              <div ref={refUser} onClick={() => setShowUser(!showUser)} className="flex">
                <FaUser />
                <FaCaretDown />
              </div>
            )}

            {showUser && (
              <motion.ul
                ref={refUserMenu}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                {/* Check if the user is logged in */}
                {isLoggedIn ? (
                  // If logged in, display options to view profile and logout
                  <>
                    {/* <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      View Profile
                    </li> */}
                    <li
                      onClick={confirmLogout}
                      className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  // If not logged in, display options to login and register
                  <>
                    <Link to="/signin">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Login
                      </li>
                    </Link>
                    <Link onClick={() => setShowUser(false)} to="/signup">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Register
                      </li>
                    </Link>
                  </>
                )}

              </motion.ul>
            )}
            <Link  to={isLoggedIn ? "/cart" : "#"} onClick={isLoggedIn ? null : handleLoginToast}>
              <div className="relative">
              
                <FaShoppingCart /> 
                {products.length > 0 && (
                  <p className="absolute top-3 -right-2 bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {products.length}
                  </p>
                )}

              </div>
            </Link>
            <Link to={isLoggedIn ? "/wishlist" : "#"} onClick={isLoggedIn ? null : handleLoginToast}>
              <div className="relative">
              
                <BsSuitHeartFill />

                {wishlist.length > 0 && (
                  <p className="absolute top-3 -right-2 bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {wishlist.length}
                  </p>
                )}

              </div>
            </Link>
           
          </div>
        </Flex>
      </div>
      {/* Loading spinner */}
      {isLoadingLogout && (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      )}
    </div>

  );
};

export default HeaderBottom;
