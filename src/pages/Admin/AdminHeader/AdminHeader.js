import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation ,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import Image from "../../../components/designLayouts/Image";
import { adminMenuList } from "../../../constants";
import Flex from "../../../components/designLayouts/Flex";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../constants/config";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
const AdminHeader = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);
  
  const handleLogout = () => {
    setShowLogoutDialog(true);
  };


  const confirmLogout = async () => {
    setIsLoadingLogout(true);
    try {
      // Call the logout endpoint
      const response = await axios.post(`${BASE_URL}/api/users/logout`, {
        id: sessionStorage.getItem('sessionId'),
        role: sessionStorage.getItem('userRole')
      });
      // Check if the logout was successful
      if (response.status === 200) {
        sessionStorage.clear();
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
    } finally {
      setIsLoadingLogout(false); // Reset loading state after logout attempt
      setShowLogoutDialog(false);
    }
  };
  
  const cancelLogout = () => {
    setShowLogoutDialog(false);
    // Navigate to shop route
    navigate("/admin");
  };
  
  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/admin">
            <div>
              <Image className="w-16 object-cover" imgSrc={logo} />
            </div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-2"
              >
                <>
                {adminMenuList.map(({ _id, title, link }) => (
                    <NavLink
                      key={_id}
                      className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#33333] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#FF6A00] md:border-r-[2px] border-r-[#E5E5E5] hoverEffect last:border-r-0"
                      to={link}
                      state={{ data: location.pathname.split("/")[1] }}
                      onClick={title === "Logout" ? handleLogout : null}
                    >
                      <li>{title}</li>
                    </NavLink>
                  ))}
            
                </>
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                  <Link onClick={() => setSidenav(false)}  to="/admin">
                    <img
                      className="w-16 mb-6"
                      src={logoLight}
                      alt="logoLight"
                    />
                  </Link>
                  
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {adminMenuList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() =>{
                              setSidenav(false);
                              if (item.title === "Logout") {
                                setSidenav(false);
                                handleLogout(); // Execute handleLogout only if the item title is "Logout"
                              }
                            }}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>

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
      {/* Loading spinner */}
      {isLoadingLogout && (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
