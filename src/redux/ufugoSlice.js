import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: [],
  products: [],
  // checkedBrands: [],
  checkedCategorys: [],
  wishlist: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity += action.payload.quantity;
        toast.info("This product is already added to your cart");
      } else {
        state.products.push(action.payload);
         // Dispatch a success toast
        toast.success("Product added to cart");
      }
     
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity++;
        // Dispatch a success toast
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        // Dispatch a success toast
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      // Dispatch a success toast
      toast.error("Product removed from cart");
    },
    resetCart: (state) => {
      state.products = [];
      // Dispatch a success toast
    },

    // toggleBrand: (state, action) => {
    //   const brand = action.payload;
    //   const isBrandChecked = state.checkedBrands.some(
    //     (b) => b._id === brand._id
    //   );

    //   if (isBrandChecked) {
    //     state.checkedBrands = state.checkedBrands.filter(
    //       (b) => b._id !== brand._id
    //     );
    //   } else {
    //     state.checkedBrands.push(brand);
    //   }
    // },

    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b.id === category.id
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (b) => b.id !== category.id
        );
      } else {
        state.checkedCategorys.push(category);
      }
    },

    addToWishlist: (state, action) => {

      const item = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity += action.payload.quantity;
        toast.info("This product is already added to your wishlist");
      } else {
        state.wishlist.push(action.payload);
        toast.success("Product added to wishlist");
      }
    },
    removeFromWishlist: (state, action) => {

      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      // Dispatch a success toast
      toast.error("Product removed from wishlist");
    },
    resetWishList: (state) => {
      state.wishlist = [];
      // Dispatch a success toast
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  // toggleBrand,
  toggleCategory,
  addToWishlist,
  removeFromWishlist,
  resetWishList
} = orebiSlice.actions;
export default orebiSlice.reducer;
