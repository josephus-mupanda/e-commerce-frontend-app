
import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white rounded-md w-[92px] h-[35px] flex justify-center items-center text-base font-semibold  duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
