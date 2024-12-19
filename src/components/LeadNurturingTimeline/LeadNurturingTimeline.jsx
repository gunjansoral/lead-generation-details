import React, { useState, useEffect } from "react";
import { useInfiniteScroll } from "../../hooks";
import LeadNurturingTimelineItem from "./LeadNurturingTimelineItem";
import { useLeadNurturing } from "../../context/LeadNurturingContext";

const LeadNurturingTimeline = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { leadData, loadingMap, hasMore, getLeadHistory } = useLeadNurturing();

  // Infinite scroll to load more data
  useInfiniteScroll(() => getLeadHistory(), hasMore);

  useEffect(() => {
    getLeadHistory(); // Initial data load
  }, []);

  const isGlobalLoading = loadingMap.global; // Check global loading state

  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8 lg:px-12 rounded-lg shadow-md">
      <ol className="relative border-l-2 border-gray-300">
        {leadData.map((data, index) => (
          <LeadNurturingTimelineItem
            key={data.id || index}
            event={data}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </ol>

      {isGlobalLoading && (
        <div className="flex justify-center items-center mt-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="ml-3 text-blue-500">Loading...</p>
        </div>
      )}

      {!hasMore && !isGlobalLoading && (
        <p className="text-center text-gray-500 mt-6">No more events to show.</p>
      )}

    </div>
  );
};

export default LeadNurturingTimeline;
