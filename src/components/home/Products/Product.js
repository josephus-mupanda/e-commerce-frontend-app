import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { addToCart, addToWishlist } from "../../../redux/ufugoSlice";
import { toast } from "react-toastify";

const Product = (props) => {
  const dispatch = useDispatch();

  const id = props.name;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(id);
 // const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  const productItem = props;

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  // Calculate the index of the product in the list
  const index = props.index;

  const checkProductExists = (productId, productList) => {
    return productList.some((item) => item.id === productId);
  };


  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div onClick={handleProductDetails}>
          <Image className="w-full h-60" 

          imgSrc={`data:image/jpeg;base64,${props.image}`}
          />
        </div>
        <div className="absolute top-6 left-8">
            {index >= props.totalProducts - 5 && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li
              onClick={() => 
                  dispatch(
                    addToWishlist({
                      id: props.id,
                      name: props.name,
                      quantity: 1,
                      image: props.image,
                      price: props.price,
                    })
                  )
              }
              
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    id: props.id,
                    name: props.name,
                    quantity: 1,
                    image: props.image,
                    price: props.price,
                  })
                )
              }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.name}
          </h2>
          <p className="text-[#767676] text-[14px]">{props.price} RWF</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.category}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
