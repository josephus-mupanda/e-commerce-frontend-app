import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

type CartState = {
  userInfo: unknown[];
  products: any[];
  checkedCategorys: any[];
  wishlist: any[];
};

const initialState: CartState = {
  userInfo: [],
  products: [],
  checkedCategorys: [],
  wishlist: [],
};

export const cartSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const item = state.products.find((product) => product.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
        toast.info("This product is already added to your cart");
      } else {
        state.products.push(action.payload);
        toast.success("Product added to cart");
      }
    },
    increaseQuantity: (state, action: PayloadAction<any>) => {
      const item = state.products.find((product) => product.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    drecreaseQuantity: (state, action: PayloadAction<any>) => {
      const item = state.products.find((product) => product.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, item.quantity - 1);
      }
    },
    deleteItem: (state, action: PayloadAction<number | string>) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
      toast.error("Product removed from cart");
    },
    resetCart: (state) => {
      state.products = [];
    },
    toggleCategory: (state, action: PayloadAction<any>) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (item) => item.id === category.id
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (item) => item.id !== category.id
        );
      } else {
        state.checkedCategorys.push(category);
      }
    },
    addToWishlist: (state, action: PayloadAction<any>) => {
      const item = state.wishlist.find((product) => product.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
        toast.info("This product is already added to your wishlist");
      } else {
        state.wishlist.push(action.payload);
        toast.success("Product added to wishlist");
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number | string>) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
      toast.error("Product removed from wishlist");
    },
    resetWishList: (state) => {
      state.wishlist = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleCategory,
  addToWishlist,
  removeFromWishlist,
  resetWishList,
} = cartSlice.actions;

export default cartSlice.reducer;
