import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/home/Header/Header";

const NotFound = () => {
  const errorCode = "404";
  const errorMessage = "The page you are looking for does not exist.";

  return (
    <div>
      <Header/>
      <div className="w-full h-screen flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="flex items-center justify-center mb-6">
            <span className="text-6xl font-bold text-[#FF8533] mr-4">
              {errorCode}
            </span>
            <span className="text-2xl font-semibold text-gray-700">
            Not Found
            </span>
          </div>
          <p className="text-lg text-gray-600 mb-6">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
