// @ts-nocheck
import React from "react";

const SkeletonProduct = () => {
  return (
    <div className="px-2">
      <div className="jshop-product-card jshop-skeleton-card w-full relative group animate-pulse">
        <div className="jshop-product-media max-w-80 max-h-80 relative overflow-hidden">
          <div className="jshop-skeleton-block w-full h-60"></div>
        </div>
        <div className="jshop-product-meta max-w-80 py-6 flex flex-col gap-3 px-4">
          <div className="flex items-center justify-between font-titleFont">
            <h2 className="jshop-skeleton-block w-3/4 h-7"></h2>
            <p className="jshop-skeleton-block w-14 h-5"></p>
          </div>
          <div className="jshop-skeleton-block w-1/2 h-5"></div>
          <div className="jshop-skeleton-block w-full h-9"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
