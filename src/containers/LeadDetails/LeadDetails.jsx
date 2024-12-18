import React from "react";
import LeadInfoCard from "../../components/LeadInfoCard";
import LeadNurturingTimeline from "../../components/LeadNurturingTimeline";
import { leadData } from "../../data/mockData";

const LeadDetails = () => {
  return (
    <div className="relative container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-sm font-bold rounded-md shadow-md">
        Lead Details
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-4">
          {leadData.name || "User"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-lg">
            <span className="font-medium text-gray-600">Email:</span>{" "}
            {leadData.email}
          </p>
          <p className="text-lg">
            <span className="font-medium text-gray-600">Phone:</span>{" "}
            {leadData.phone}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <LeadInfoCard {...leadData.original} title="Original Lead" />
        <LeadInfoCard {...leadData.revival} title="Revival Lead" />
      </div>

      <LeadNurturingTimeline historyEvents={leadData.history} />
    </div>
  );
};

export default LeadDetails;
