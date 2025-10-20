import React,{useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../../../redux/ufugoSlice";
import axios from "axios";
import { BASE_URL } from "../../../constants/config";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const ProductInfo = ({productInfo}) => {

  // const location = useLocation();
  // const [prevLocation, setPrevLocation] = useState("");
  // const [productInfo, setProductInfo] = useState({});

  // useEffect(() => {
  //   if (location.state && location.state.item) {
  //     setProductInfo(location.state.item);
  //   }
  //   setPrevLocation(location.pathname);
  // }, [location]);

  const dispatch = useDispatch();

  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (productInfo && productInfo.category) {
      fetchSimilarProducts(productInfo.category);
    }
  }, [productInfo]);

  const fetchSimilarProducts = async (categoryName) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/customer/products/category/${categoryName}`);
      console.log(response.data);
      setSimilarProducts(response.data);
      
    } catch (error) {
      console.error("Error fetching similar products", error);
    }
  };

  if (!productInfo || Object.keys(productInfo).length === 0) {
    return <div>Loading...</div>; // or render a more meaningful message
  }

  const highlightStyle = {
    color: "#d0121a", // Change this to the desired color
    fontWeight: "bold", // Change this to the desired font weight
  };


  const renderDescription = () => {
    if (!productInfo.description) {
      return null;
    }

    const description = productInfo.description.split(/:(.*?)-/).map((part, index) => {
      return (
        <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
          {part}
        </span>
      );
    });

    return <p className="text-base text-gray-600">{description}</p>;
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
      <p className="text-2xl font-semibold">
        {productInfo.price} Rwf
      </p>
      <hr />
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Category:</span> {productInfo.category}
      </p>
      
      {renderDescription()}
      {/* <div className="flex items-center">
        <p className="text-base font-normal">
          <span className="text-base font-medium"> Description:</span>{" "}
          {productInfo.description}
        </p>
      </div>
    */}

      <div className="flex justify-between">
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id: productInfo.id,
                name: productInfo.name,
                quantity: 1,
                image: productInfo.image,
                price: productInfo.price,
              })
            )
          }
          className="flex items-center justify-center w-1/2 py-2 bg-[#FF8533] hover:bg-[#FF6A00] text-white rounded-l-md duration-300 text-base md:text-lg font-titleFont mr-2"
        >
          <FaShoppingCart className="mr-2" /> Add to Cart
        </button>

        <button
          onClick={() =>
            dispatch(
              addToWishlist({
                id: productInfo.id,
                name: productInfo.name,
                quantity: 1,
                image: productInfo.image,
                price: productInfo.price,
              })
            )
          }
          className="flex items-center justify-center w-1/2 py-2 bg-[#FF8533] hover:bg-[#FF6A00] text-white rounded-r-md duration-300 text-base md:text-lg font-titleFont"
        >
          <FaHeart className="mr-2" /> Add to Wishlist
        </button>
      </div>

     {/* <div className="flex justify-between">
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id: productInfo.id,
                name: productInfo.name,
                quantity: 1,
                image: productInfo.image,
                price: productInfo.price,
              })
            )
          }
          className="flex items-center justify-center w-1/2 py-2 bg-[#FF8533] hover:bg-[#FF6A00] text-white rounded-l-md duration-300 text-lg font-titleFont mr-2"
        >
          <FaShoppingCart className="mr-2" /> Add to Cart
        </button>

        <button
          onClick={() =>
            dispatch(
              addToWishlist({
                id: productInfo.id,
                name: productInfo.name,
                quantity: 1,
                image: productInfo.image,
                price: productInfo.price,
              })
            )
          }
          className="flex items-center justify-center w-1/2 py-2 bg-[#FF8533] hover:bg-[#FF6A00] text-white rounded-r-md duration-300 text-lg font-titleFont"
        >
          <FaHeart className="mr-2" /> Add to Wishlist
        </button>
     </div> */}

    </div>
  );
};

export default ProductInfo;
