import React ,{ useContext}from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { AppContext } from "../../../context/AppContext";
import SkeletonProduct from "../../Loading/SkeletonProduct";

const NewArrivals = () => {

  const { product } = useContext(AppContext);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  
  if (!product.length) {
    const skeletonProducts = Array.from({ length: 5 }, (_, index) => (
      <SkeletonProduct key={index} />
    ));
    return (
      <div className="w-full pb-16">
        <Heading heading="New Arrivals" />
        <Slider {...settings}>{skeletonProducts}</Slider>
      </div>
    );
  }

  const latestProducts = product.slice(0, 5);

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
      {latestProducts.map((product, index) => (
        <div className="px-2" key={product.id}>
          <Product
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
            quantity = {product.quantity}
            category={product.category.name}
            index={index} // Pass index as a prop
            totalProducts={latestProducts.length} 
          />
        </div>
      ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
