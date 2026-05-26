// @ts-nocheck
import React from "react";
import { ImCross } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromWishlist,
} from "@/store/cartSlice";
import { getProductImageSrc } from "@/utils/productImage";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="jshop-line-item w-full grid grid-cols-5 mb-4 py-3">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <RiDeleteBin6Line //ImCross
          onClick={() => dispatch(removeFromWishlist(item.id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-16 h-16" 
         src={getProductImageSrc(item.imageUrl || item.image)}
         alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          {item.price} Rwf
        </div>
    
      </div>
    </div>
  );
};

export default WishlistItem;
