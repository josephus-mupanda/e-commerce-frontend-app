import React, { useEffect, useState,useContext} from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import SkeletonProduct from "../../Loading/SkeletonProduct";
const SpecialOffers = () => {
  
  const {product } = useContext(AppContext);
  const { category } = useParams();  
  const [catProducts, setCatProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Filter products based on the category
    const filteredProducts = product.filter(
      (product) => product.category.name === category
    );
    setCatProducts(filteredProducts);
    setLoading(false); 
  }, [category, product]);


  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {
         loading ? (
          <>
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
          </>
         ) : 
        (
          catProducts.map((data,index) => (
          <Product
            key={data.id}
            id={data.id}
            image={data.image}
            name={data.name}
            price={data.price}
            description={data.description}
            quantity = {data.quantity}
            category={data.category.name}
            index={index} // Pass index as a prop
            totalProducts={catProducts.length} 
          />
        ))
      )
      }
      </div>
    </div>
  );
};

export default SpecialOffers;
