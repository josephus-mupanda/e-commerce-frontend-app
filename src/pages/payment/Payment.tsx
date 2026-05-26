// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  return (
    <div className="jshop-page max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="jshop-info-panel mb-16 max-w-xl p-8">
        <p>Payment gateway only applicable for Production build.</p>
        <Link to="/">
          <button className="jshop-primary-button w-52 h-10 text-lg mt-4">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
