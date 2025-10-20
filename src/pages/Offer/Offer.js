import React, { useState } from "react";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [prevLocation] = useState("");
  const { category } = useParams();

  return (

    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title={category} prevLocation={prevLocation} />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
      
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <SpecialOffers />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Offer;
