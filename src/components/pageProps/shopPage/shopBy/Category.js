import React, { useState,useEffect,useContext } from "react";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../../../redux/ufugoSlice";
import { AppContext } from "../../../../context/AppContext";
import SkeletonCategory from "../../../Loading/SkeletonCategory"
const Category = () => {

  const { categories} = useContext(AppContext);
  const [loading, setLoading] = useState(true); 

  const checkedCategorys = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(categories.length === 0); 
    if (categories.length > 0) {
      setLoading(false);
    }
  }, [categories]);

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  return (
    <div className="w-full">
      <NavTitle title="Order by Category" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          { 
           loading ? (
            // Render SkeletonCategory component while loading
            <>
              <SkeletonCategory />
              <SkeletonCategory />
              <SkeletonCategory />
              <SkeletonCategory />
              <SkeletonCategory />
            </>
          ) : (categories.map((cat) => (
            <li
            categories={cat.id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                id={cat.id}
                checked={checkedCategorys.some((b) => b.id === cat.id)}
                onChange={() => handleToggleCategory(cat)}
              />
              {cat.name}

            </li>
          ))
        )}
        </ul>
      </div>
    </div>
  );
};

export default Category;
