// @ts-nocheck
import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsSuitHeartFill } from "react-icons/bs";
import apiClient from "@/store/apiClient";
import { toast } from "sonner";
import { BASE_URL } from "../../../constants/config";
import { AppContext } from "@/contexts/AppContext";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth } from "@/store/authSlice";
import { getProductImageSrc } from "@/utils/productImage";
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
  const dispatch = useAppDispatch();
  const ref = useRef();

  const refUser = useRef();
  const refUserMenu = useRef();

 
  useEffect(() => {
    const onBodyClick = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    document.body.addEventListener("click", onBodyClick);
    return () => document.body.removeEventListener("click", onBodyClick);
  }, [show, ref]);

  useEffect(() => {
    const onBodyClick = (e) => {
      const clickedUser = refUser.current && refUser.current.contains(e.target);
      const clickedMenu = refUserMenu.current && refUserMenu.current.contains(e.target);
      if (!clickedUser && !clickedMenu) {
        setShowUser(false);
      }
    };
    document.body.addEventListener("click", onBodyClick);
    return () => document.body.removeEventListener("click", onBodyClick);
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
      const response = await apiClient.post(`${BASE_URL}/api/users/logout`, {
        id: sessionStorage.getItem('sessionId'),
        role: sessionStorage.getItem('userRole')
      });
      // Check if the logout was successful
      if (response.status === 200) {
        dispatch(clearAuth());
        setIsLoggedIn(false);
        toast.success("Logging out...");
        // Navigate to shop route
        navigate("/");
      } else {
        toast.error("Logout failed");
        // Handle logout failure
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
      toast.error("Error occurred during logout.");
      // Handle error
    }finally{
      setIsLoadingLogout(false);
      setShowLogoutDialog(false);
    }
  };

  return (

    <div className="jshop-subheader w-full relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col gap-4 lg:flex-row items-stretch lg:items-center justify-between w-full px-4 py-4 h-full lg:min-h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="jshop-category-trigger flex h-12 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Order by Category</p>
            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="jshop-popover absolute left-4 top-16 z-50 w-72 max-w-[calc(100vw-2rem)] h-auto p-3"
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
          <div className="glass-control relative w-full lg:max-w-[620px] h-[50px] text-base text-primeColor flex items-center gap-2 justify-between px-6 rounded-xl">
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
                className="jshop-search-results w-full mx-auto max-h-96 top-16 absolute left-0 z-50 overflow-y-auto scrollbar-hide cursor-pointer"
              >
              
              {/* Show skeleton loading while data is being fetched */}
              {
              !filteredProducts.length ? (
                <div className="animate-pulse">
                  {[...Array(4)].map((_, index) => (
                     <div key={index} className="jshop-search-row max-w-[600px] h-24 mb-3 flex items-center gap-3 animate-pulse">
                     <div className="w-24 h-24 bg-white/60 animate-pulse rounded "></div>
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
                        className="jshop-search-row max-w-[600px] h-24 mb-3 flex items-center gap-3"
                      >
                        <img 
                          className="w-24 h-24 object-cover"
                          src={getProductImageSrc(myProduct.imageUrl || myProduct.image)}
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
          <div className="jshop-actions-bar flex gap-4 mt-2 lg:mt-0 items-center cursor-pointer relative">
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
                className="jshop-account-menu absolute top-10 right-0 z-50 w-52 h-auto p-2"
              >
                {/* Check if the user is logged in */}
                {isLoggedIn ? (
                  // If logged in, display options to view profile and logout
                  <>
                    {/* <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      View Profile
                    </li> */}
                    <li
                      onClick={() => setShowLogoutDialog(true)}
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
      {showLogoutDialog && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="glass-panel-strong w-full max-w-sm rounded-2xl p-6 text-center">
            <h2 className="text-xl font-black text-primeColor">Log out?</h2>
            <p className="mt-2 text-sm text-lightText">
              Your shopping session will be closed on this device.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutDialog(false)}
                className="glass-control flex-1 rounded-lg px-4 py-2 font-bold text-primeColor"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                disabled={isLoadingLogout}
                className="flex-1 rounded-lg bg-[#FF8533] px-4 py-2 font-bold text-white transition hover:bg-[#FF6A00] disabled:opacity-60"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default HeaderBottom;
