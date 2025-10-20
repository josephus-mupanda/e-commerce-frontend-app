import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/home/Header/Header";
const AccessDenied = () => {
  const errorCode = "403";
  const errorMessage = "Access denied. You are not authorized to access this resource.";

  return (
    <div>
      <Header/>
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <div className="flex items-center justify-center mb-6">
          <span className="text-6xl font-bold text-[#FF8533] mr-4">
            {errorCode}
          </span>
          <span className="text-2xl font-semibold text-gray-700">
            Access Denied
          </span>
        </div>
        <p className="text-lg text-gray-600 mb-6">{errorMessage}</p>
        <div className="flex justify-center">
          <Link
            to="/signin"
            className="bg-[#FF8533] hover:bg-[#FF6A00] text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
            // onClick={() => window.location.reload()}
          >
            Try to sign in 
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AccessDenied;
