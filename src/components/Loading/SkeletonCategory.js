import React from "react";

const SkeletonCategory = () => {
  return (
    <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300">
      <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
      <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
    </li>

  );
};

export default SkeletonCategory;
