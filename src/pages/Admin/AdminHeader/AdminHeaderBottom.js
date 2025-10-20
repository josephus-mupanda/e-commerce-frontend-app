import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../../components/designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";

const AdminHeaderBottom = () => {
  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              // onChange={handleSearch}
              // value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
          
          </div>
          <Link to="/shop">
            <button className="w-52 h-10 bg-primeColor rounded-md  text-white hover:bg-black duration-300">
              Create category
            </button>
          </Link>

        </Flex>
      </div>
    </div>
  );
};

export default AdminHeaderBottom;
