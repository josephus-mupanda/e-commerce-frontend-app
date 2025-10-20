import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetWishList } from "../../redux/ufugoSlice";
import { emptyCart } from "../../assets/images/index";
import WishlistItem from "./WishlistItem";
import { toast } from "react-toastify";
import { CUSTOMER_ROLE } from "../../constants/config";
import withAuthorization from "../../constants/hoc/withAuthorization";
import axios from "axios";

const WishList = () => {

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.orebiReducer.wishlist);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Wishlist" />
      {wishlist.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
          </div>
          <div className="mt-5">
            {wishlist.map((item) => (
              <div key={item._id}>
                <WishlistItem item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetWishList())}
            className="py-2 px-10 bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white rounded-md cursor-pointer font-semibold  mb-4  duration-300"
          >
            Reset wishList
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your wishList feels empty.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your wishlist is craving for delicious fast food items. Give it purpose - add burgers, pizzas, fries, and more to satisfy your cravings and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white rounded-md cursor-pointer active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default withAuthorization(WishList,[CUSTOMER_ROLE]);
