import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/home/Header/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/config";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
const REGISTER_ENDPOINT = "/api/users/register";

const SignUp = () => {

  // ============= Initial State Start here =============
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errUserName, setErrUserName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleName = (e) => {
    setUserName(e.target.value);
    setErrUserName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrConfirmPassword("");
  };

  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (checked) {
      if (!userName) {
        setErrUserName("Enter your name");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
        }
      }
      if (!password) {
        setErrPassword("Create a password");
      } else {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
        }
      }
      if (password !== confirmPassword) {
        setErrConfirmPassword("Passwords do not match");
      }
   
      // ============== Getting the value ==============
      if (
        userName &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6 &&
        password === confirmPassword
      ) {

        setIsLoading(true); 

        try {
          const response = await axios.post(BASE_URL + REGISTER_ENDPOINT, {
            username: userName,
            email: email,
            password: password,
          });
          console.log(response.data);
          toast.success("Registration successful! Please check your email to confirm.");
          setUserName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          navigate("/signin");

        } catch (error) {
            if (error.response && error.response.status === 406) {
              const errorMessage = error.response.data;

              if (errorMessage.includes("email")) {
                  toast.warn("User email already exists");
              } else if (errorMessage.includes("Username")) {
                  toast.warn("Username already exists");
              } else {
                  toast.error(errorMessage);
                }
            } else {
                toast.error("An unexpected error occurred. Please check your network and try again.");
            }
          } 
        finally {
            setIsLoading(false);
        }
        //  setIsLoading(false); 
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full lgl:w-1/2 h-full">
          {successMsg ? (
            <div className="w-[500px]">
              <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
                {successMsg}
              </p>
              <Link to="/signin">
                <button
                  className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
              tracking-wide hover:bg-black hover:text-white duration-300"
                >
                  Sign in
                </button>
              </Link>
            </div>
          ) : (
          (isLoading? 
            <LoadingSpinner />
           :
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
           <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
             <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
               Create your account
             </h1>
             <div className="flex flex-col gap-3">
               {/* client name */}
               <div className="flex flex-col gap-.5">
                 <p className="font-titleFont text-base font-semibold text-gray-600">
                   Username
                 </p>
                 <input
                   onChange={handleName}
                   value={userName}
                   className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                   type="text"
                   placeholder="eg. Josephus Mupanda"
                 />
                 {errUserName && (
                   <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                     <span className="font-bold italic mr-1">!</span>
                     {errUserName}
                   </p>
                 )}
               </div>
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
                   placeholder="Create password"
                 />
                 {errPassword && (
                   <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                     <span className="font-bold italic mr-1">!</span>
                     {errPassword}
                   </p>
                 )}
               </div>
           
               {/* Confirm Password */}
               <div className="flex flex-col gap-.5">
                 <p className="font-titleFont text-base font-semibold text-gray-600">
                   Confirm Password
                 </p>
                 <input
                   onChange={handleConfirmPassword}
                   value={confirmPassword}
                   className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                   type="password"
                   placeholder="Confirm password"
                 />
                 {errConfirmPassword && (
                   <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                     <span className="font-bold italic mr-1">!</span>
                     {errConfirmPassword}
                   </p>
                 )}
               </div>

               {/* Checkbox */}
               <div className="flex items-start mdl:items-center gap-2">
                 <input
                   onChange={() => setChecked(!checked)}
                   className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                   type="checkbox"
                 />
                 <p className="text-sm text-primaryColor">
                   I agree to the J-Shop{" "}
                   <span className="text-[#FF8533]">Terms of Service </span>and{" "}
                   <span className="text-[#FF8533]">Privacy Policy</span>.
                 </p>
               </div>
               <button
                 onClick={handleSignUp}
                 className={`${
                   checked
                     ? "bg-[#FF8533] hover:bg-[#FF6A00] text-white hover:text-white cursor-pointer"
                     : "bg-gray-500 hover:bg-gray-500 hover:text-white  cursor-none"
                 } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
               >
                 Create Account
               </button>
               <p className="text-sm text-center font-titleFont font-medium">
                 Do you have an Account?{" "}
                 <Link to="/signin">
                   <span className="hover:text-[#FF8533] duration-300">
                     Sign in
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

export default SignUp;
