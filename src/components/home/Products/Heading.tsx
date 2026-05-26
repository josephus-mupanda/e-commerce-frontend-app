// @ts-nocheck
import React from "react";

const Heading = ({ heading }) => {
  return (
    <div className="jshop-section-heading pb-6">
      <span className="jshop-hud-label text-primeColor">Fresh feed</span>
      <h2>{heading}</h2>
    </div>
  );
};

export default Heading;
