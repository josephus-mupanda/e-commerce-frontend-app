// src/components/LoadingSpinner.js
import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <TailSpin
        height="50"
        width="50"
        color="#FF8533"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
