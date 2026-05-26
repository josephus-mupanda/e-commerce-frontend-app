// @ts-nocheck
import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="jshop-footer-bottom w-full group px-4">
      <div className="max-w-container mx-auto pt-6 pb-10">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2024 | Ufugo shopping | All Rights Reserved |
          <a href="https://emisha-test.vercel.app/#" target="_blank" rel="noreferrer">
            <span className="ml-1 font-medium group-hover:text-primeColor">
              Powered by emisha.com
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
