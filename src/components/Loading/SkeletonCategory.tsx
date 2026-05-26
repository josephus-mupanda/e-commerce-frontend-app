// @ts-nocheck
import React from "react";

const SkeletonCategory = () => {
  return (
    <li className="jshop-skeleton-category flex items-center gap-2 duration-300">
      <div className="jshop-skeleton-block w-5 h-5 animate-pulse"></div>
      <div className="jshop-skeleton-block w-20 h-4 animate-pulse"></div>
    </li>

  );
};

export default SkeletonCategory;
