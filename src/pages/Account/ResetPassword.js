import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/config";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import Header from "../../components/home/Header/Header";

const RESET_PASSWORD_ENDPOINT = "/api/users/reset-password";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrConfirmPassword("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password) {
      setErrPassword("Create a password");
    } else if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      setErrConfirmPassword("Passwords do not match");
    }

    if (
      password &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      setIsLoading(true);
      const token = new URLSearchParams(location.search).get("token");
      try {
        const response = await axios.post(BASE_URL + RESET_PASSWORD_ENDPOINT, {
          token: token,
          newPassword: password,
        });
        toast.success("Password reset successful! You can now login.");
        navigate("/signin");
      } catch (error) {
        toast.error("Invalid or expired token. Please try again.");
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
                  Reset Password
                </h1>
                <div className="flex flex-col gap-3">
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

                  <button
                    onClick={handleResetPassword}
                    className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
