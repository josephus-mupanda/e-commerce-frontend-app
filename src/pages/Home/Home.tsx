// @ts-nocheck
import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
// import Sale from "../../components/home/Sale/Sale";
// import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
// import YearProduct from "../../components/home/YearProduct/YearProduct";

const Home = () => {
  return (
    <div className="jshop-page w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="jshop-section max-w-container mx-auto px-4">
        {/* <Sale /> */}
        <NewArrivals />
        {/* <YearProduct />
        <SpecialOffers /> */}
      </div>
    </div>
  );
};

export default Home;
