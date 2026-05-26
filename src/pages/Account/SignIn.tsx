// @ts-nocheck
import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import Header from "../../components/home/Header/Header";
import apiClient from "@/store/apiClient";
import { toast } from "sonner";
import { BASE_URL,ADMIN_ROLE,CUSTOMER_ROLE } from "../../constants/config";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/authSlice";
const LOGIN_ENDPOINT = "/api/auth/login";

const SignIn = () => {
  // ============= Initial State Start here =============
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============

  const [isLoading, setIsLoading] = useState(false);

  const navigate =  useNavigate();
  const dispatch = useAppDispatch();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Create a password");
    }
    // ============== Getting the value ==============
    if (email && password) {
      setIsLoading(true); 
      try {
        
        const response = await apiClient.post(BASE_URL+LOGIN_ENDPOINT, {
          email: email,
          password: password,
        });
        console.log(response.data);
        // Store user information in session storage
        sessionStorage.setItem("sessionId", response.data.sessionId);
        sessionStorage.setItem("userRole", response.data.userRole);
        sessionStorage.setItem("username", response.data.username);
        dispatch(
          setCredentials({
            sessionId: response.data.sessionId,
            role: response.data.userRole,
            username: response.data.username,
          })
        );

        // Determine redirect URL based on user role
        const redirectUrl = getRedirectUrl(response.data.userRole);
        
        // Redirect user to the appropriate page
        navigate(redirectUrl);

        setEmail("");
        setPassword("");

      }  catch (error) {
        const status = error?.response?.status || error?.status;
        if (status) {
          switch (status) {

            case 401:
              toast.error("Invalid email or password. Please try again.");
              break;
            // Check if email is confirmed
            case 403:
              toast.warn("Please confirm your email before logging in.");
              break;
            default:
              toast.error("An unexpected error occurred. Please try again.");
          }
        } else {
          toast.error("An unexpected error occurred. Please check your network and try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

// Function to determine the redirect URL based on user role
const getRedirectUrl = (userRole) => {
  if (userRole === ADMIN_ROLE) {
    return "/admin"; // Redirect to admin page
  } else if (userRole === CUSTOMER_ROLE) {
    return "/shop"; // Redirect to customer page
  } else {
    return "/signin"; 
  }
};

  return (
    <div className="jshop-auth-page">
      <Header />
      <div className="jshop-auth-screen w-full min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          ( isLoading ? ( 
              <LoadingSpinner />
          ) :
          <form className="jshop-auth-form w-full lgl:w-[450px] flex items-center justify-center">
            <div className="jshop-auth-card px-6 py-7 w-full flex flex-col justify-center">
              <h1 className="font-titleFont font-black text-3xl mdl:text-4xl mb-4">
                Sign in
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="eg. josephus@gmail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="enter password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSignIn}
                  className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Sign In
                </button>
                <div className="text-center mt-2">
                  <Link to="/forgot-password" className="text-sm font-titleFont font-medium text-[#FF8533] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't you have an Account?{" "}
                  <Link to="/signup">
                    <span className="hover:text-[#FF8533] duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
          )
        )}
      </div>
    </div>
    </div>
  );
};

export default SignIn;
