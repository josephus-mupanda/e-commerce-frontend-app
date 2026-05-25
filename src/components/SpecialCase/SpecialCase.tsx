// @ts-nocheck
import React,{useState, useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { BsSuitHeartFill } from "react-icons/bs";
import { MdSwitchAccount , MdLogout, MdLogin} from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import apiClient from "@/store/apiClient";
import { BASE_URL } from "../../constants/config";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth } from "@/store/authSlice";

const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const wishlist = useSelector((state) => state.orebiReducer.wishlist);

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    } finally {
      setShowLogoutDialog(false);
    }
  };


  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">

        {showLogoutDialog && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
            <div className="glass-panel-strong w-full max-w-sm rounded-2xl p-6 text-center">
              <p className="text-lg font-black mb-4 text-primeColor">
                Log out?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={confirmLogout}
                  className="bg-[#FF8533] hover:bg-[#FF6A00] text-white px-4 py-2 rounded-md"
                >
                  Logout
                </button>
                <button
                  onClick={cancelLogout}
                  className="glass-control text-gray-800 px-4 py-2 rounded-md"
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
