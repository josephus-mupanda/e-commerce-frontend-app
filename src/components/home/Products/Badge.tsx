// @ts-nocheck

import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="jshop-product-badge text-white w-[92px] h-[35px] flex justify-center items-center text-base font-black duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
