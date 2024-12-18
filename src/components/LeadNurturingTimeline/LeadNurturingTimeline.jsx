import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useInfiniteScroll } from "../../hooks";
import { getPaginatedEvents } from "../../services/leadService";
// import { useInfiniteScroll } from "../../hooks";

const LeadNurturingTimeline = ({ historyEvents }) => {
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    setVisibleEvents(historyEvents.slice(0, 4));
  }, [historyEvents]);

  const loadMoreEvents = () => {
    if (loading || visibleEvents.length === historyEvents.length) return;

    setLoading(true);
    setTimeout(() => {
      const newEvents = getPaginatedEvents(
        historyEvents,
        visibleEvents.length,
        4
      )
      setVisibleEvents((prev) => [...prev, ...newEvents]);
      setLoading(false);
    }, 500);
  };

  useInfiniteScroll(loadMoreEvents, true)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8 lg:px-12 rounded-lg shadow-md">
      <ol className="relative border-l-2 border-gray-300">
        {visibleEvents.map((event, index) => (
          <li key={index} className="mb-10 ms-6">
            <span
              className={`absolute flex items-center justify-center w-5 h-5 rounded-full -left-2.5 border-2 ${event.status === "completed"
                ? "bg-green-500 border-green-600"
                : event.status === "in-progress"
                  ? "bg-blue-500 border-blue-600"
                  : "bg-gray-400 border-gray-500"
                }`}
            ></span>

            <div
              className="flex justify-between items-center cursor-pointer group"
              onClick={() => toggleAccordion(index)}
              role="button"
              tabIndex={0}
            >
              <div className="group-hover:text-blue-600 transition duration-300">
                <time className="text-sm text-gray-500">{event.date}</time>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                  {event.eventTitle}
                </h3>
              </div>
              <div className="text-gray-600 transition-transform duration-300">
                {openIndex === index ? (
                  <FaChevronDown className="text-xl group-hover:text-blue-600" />
                ) : (
                  <FaChevronRight className="text-xl group-hover:text-blue-600" />
                )}
              </div>
            </div>

            <div
              className={`transition-all duration-500 overflow-hidden ${openIndex === index
                ? "max-h-60 opacity-100 transform scale-y-100"
                : "max-h-0 opacity-0 transform scale-y-90"
                }`}
            >
              <p className="mt-3 text-gray-600">{event.description}</p>
            </div>
          </li>
        ))}
      </ol>

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="ml-3 text-blue-500">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default LeadNurturingTimeline;
