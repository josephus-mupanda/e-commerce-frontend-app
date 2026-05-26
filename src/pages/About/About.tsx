// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="jshop-page max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      <div className="jshop-info-panel mb-16 max-w-3xl p-8">
        <span className="jshop-hud-label text-primeColor">Our kitchen signal</span>
        <h1 className="mt-4 max-w-[660px] text-lg leading-8 text-lightText mb-6">
          <span className="text-primeColor font-black text-2xl">J-shop</span>{" "}
          is one of the world's leading culinary destinations and is internationally
  recognized for celebrating the essence of diverse global cuisines.
        </h1>
        <Link to="/shop">
          <button className="jshop-primary-button px-8 py-3 font-titleFont font-black text-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
