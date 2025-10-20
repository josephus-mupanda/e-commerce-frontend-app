import React from "react";

const SkeletonProduct = () => {
  return (
    <div className="px-2">
      <div className="w-full relative group">
        <div className="max-w-80 max-h-80 relative overflow-y-hidden animate-pulse">
          <div className="w-full h-60 bg-gray-200"></div>
          <div className="w-full h-32 absolute bg-white -bottom-[130px] duration-700 animate-pulse">
            <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
              <li className="text-[#767676] bg-gray-200 text-sm font-normal border-b-[1px] border-b-gray-200 pb-1 duration-300 w-full rounded "></li>
              <li className="text-[#767676] bg-gray-200 text-sm font-normal border-b-[1px] border-b-gray-200 pb-1 duration-300 w-full rounded"></li>
              <li className="text-[#767676] bg-gray-200 text-sm font-normal border-b-[1px] border-b-gray-200 pb-1 duration-300 w-full rounded"></li>
            </ul>
          </div>
        </div>
        <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
          <div className="flex items-center justify-between font-titleFont">
            <h2 className="text-lg text-gray-200 font-bold bg-gray-200 w-3/4 h-7 rounded animate-pulse"></h2>
            <p className="text-[#767676] text-[14px] bg-gray-200 w-14 h-5 rounded animate-pulse"></p>
          </div>
          <div className="bg-gray-200 w-1/2 h-5 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
