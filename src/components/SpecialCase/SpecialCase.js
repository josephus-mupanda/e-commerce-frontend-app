import React,{useState, useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { BsSuitHeartFill } from "react-icons/bs";
import { MdSwitchAccount , MdLogout, MdLogin} from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../constants/config";

const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const wishlist = useSelector((state) => state.orebiReducer.wishlist);

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the session ID exists in sessionStorage
    const sessionId = sessionStorage.getItem("sessionId");
    const userLoggedIn = sessionId !== null && sessionId !== "";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLoginToast = () => {
    toast.warning("Please login first to view your cart.");
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
    // Navigate to shop route
    navigate("/");
  };

  const confirmLogout = async () => {
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
    }
  };


  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">

        {showLogoutDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={confirmLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Logout
                </button>
                <button
                  onClick={cancelLogout}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      {!isLoggedIn ? (
        <Link to="/signin">
         <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
           <div className="flex justify-center items-center">
             <MdLogin className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
 
             <MdLogin className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
           </div>
           <p className="text-xs font-semibold font-titleFont">Login</p>
         </div>
        </Link> ) 
        : (
          <></>
        // <Link onClick={handleLogout}>
        //   <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
        //     <div className="flex justify-center items-center">
        //       <MdLogout className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

        //       <MdLogout className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
        //     </div>
        //     <p className="text-xs font-semibold font-titleFont">Logout</p>
        //   </div>
        // </Link>

       ) }
      <Link to={isLoggedIn ? "/cart" : "#"} onClick={isLoggedIn ? null : handleLoginToast}>
        {/* <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
           */}
          <div className={`bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative ${
            isLoggedIn ? "" : "pointer-events-none"
          }`}
          >
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Buy Now</p>
          {products.length > 0 && (
            <p className="absolute top-1 right-2 bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {products.length}
            </p>
          )}
        </div>
      </Link>

      <Link to={isLoggedIn ? "/wishlist" : "#"} onClick={isLoggedIn ? null : handleLoginToast}>
        {/* <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative"> */}
          
        <div className={`bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative ${
            isLoggedIn ? "" : "pointer-events-none"
          }`}
          >
          <div className="flex justify-center items-center">
            <BsSuitHeartFill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <BsSuitHeartFill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">wishlist</p>
          {wishlist.length > 0 && (
            <p className="absolute top-1 right-2 bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {wishlist.length}
            </p>
          )}
        </div>
      </Link>

    </div>
  );
};

export default SpecialCase;
