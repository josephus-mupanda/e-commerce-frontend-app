import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/config";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import Header from "../../components/home/Header/Header";

const FORGOT_PASSWORD_ENDPOINT = "/api/users/forgot-password";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter your email");
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(BASE_URL + FORGOT_PASSWORD_ENDPOINT, {
          email: email,
        });
        toast.success("Password reset link sent! Please check your email.");
        navigate("/signin");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("Email not found. Please try again.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full lgl:w-1/2 h-full">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
              <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                  Forgot Password
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

                  <button
                    onClick={handleForgotPassword}
                    className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                  >
                    Send Reset Link
                  </button>
                  <p className="text-sm text-center font-titleFont font-medium">
                    Remembered your password?{" "}
                    <Link to="/signin">
                      <span className="hover:text-blue-600 duration-300">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
