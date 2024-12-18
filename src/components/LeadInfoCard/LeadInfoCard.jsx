import React from "react";
import { FaCar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const LeadInfoCard = ({ title, source, leadInDate, interestedVehicle, status }) => {
  const isSold = status === "Sold";

  return (
    <div
      className={`rounded-lg p-6 shadow-lg bg-gradient-to-b from-white to-gray-50 hover:shadow-4xl transition-transform hover:scale-[1.01] duration-300`}
    >
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {/* Status Icon */}
        {isSold ? (
          <FaCheckCircle className="text-green-500 text-2xl" />
        ) : (
          <FaTimesCircle className="text-red-500 text-2xl" />
        )}
      </div>

      {/* Details */}
      <div className="space-y-4 text-gray-700">
        <p className="flex items-center">
          <span className="font-medium mr-1">Source:</span>
          <span className="text-gray-900">{source}</span>
        </p>
        <p className="flex items-center">
          <span className="font-medium mr-1">Lead In:</span>
          <span className="text-gray-900">{leadInDate}</span>
        </p>
        <p className="flex items-center">
          <FaCar className="text-blue-500 mr-2" />
          <span className="font-medium">Interested Vehicle:</span>
          <span className="ml-2 text-gray-900">{interestedVehicle}</span>
        </p>
      </div>

      {/* Status Badge */}
      <div className="mt-6">
        <span
          className={`inline-block px-4 py-1 text-sm font-semibold rounded-full shadow-md ${isSold
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
            }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default LeadInfoCard;
