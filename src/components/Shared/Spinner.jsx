import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="ml-3 text-blue-500">Loading...</p>
    </div>
  );
};

export default Spinner;
