// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import { getProductImageSrc } from "@/utils/productImage";
const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    if (location.state && location.state.item) {
      setProductInfo(location.state.item);
    }
    setPrevLocation(location.pathname);
  }, [location]);

  // useEffect(() => {
  //   setProductInfo(location.state.item);
  //   setPrevLocation(location.pathname);
  // }, [location, productInfo.description]);

  return (
    <div className="jshop-page w-full mx-auto">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="jshop-product-detail w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 p-4">
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full "
              src={getProductImageSrc(productInfo.imageUrl || productInfo.image)}
              alt={productInfo.image}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
            {/* <ProductInfo /> */}
          </div>
        </div>
        <NewArrivals/>
      </div>
    </div>
  );
};

export default ProductDetails;
