import React, { useEffect,useState,useContext } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { AppContext } from "../../../context/AppContext";
import SkeletonProduct from "../../Loading/SkeletonProduct";

function Items({ currentItems, selectedCategories,viewType,loading }) {
  // Filter items based on selected categories
  const filteredItems = currentItems.filter((product) => {

    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.name === product.category.name);
    return isCategorySelected;
  });

   // Sort the filtered items array in descending order based on index
  //  const sortedItems = filteredItems.sort((a, b) => {
  //   return b.index - a.index;
  // });

  return (
    <>
     { loading ? (
        <>
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
        </>
      ) : (
       filteredItems.map((product, index) => (
          <div key={product.id} className={
            `w-full
            ${viewType === "list" ?
            "flex flex-col mb-4" : ""}`
          }>
        {/* <div key={product.id} className="w-full"> */}
          <Product
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
            quantity = {product.quantity}
            category={product.category.name}
            index={index} // Pass index as a prop
            totalProducts={filteredItems.length} 
          />
          </div>
      )  
      )
    )}
    </>
  );
}

const Pagination = ({ itemsPerPage , viewType}) => {

  const { product } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);  

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = product.slice(itemOffset, endOffset);

  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const pageCount = Math.ceil(product.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % product.length;
    const newStart = newOffset + 1; // Adjust the start index

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  useEffect(() => {
    setLoading(product.length === 0); // Set loading to true if no product data is available
    if (product.length > 0) {
      setLoading(false); // Set loading to false if product data is available
    }
  }, [product]);

  return (
    <div>
      <div
          className={`${
            viewType === "list"
              ? "flex flex-col gap-4"
              : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10"
          }`}
        >
      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10"> */}
        <Items
          currentItems={currentItems}
          selectedCategories={selectedCategories}
          viewType={viewType}
          loading={loading}
        />

      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, product.length)} of{" "}
          {product.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
