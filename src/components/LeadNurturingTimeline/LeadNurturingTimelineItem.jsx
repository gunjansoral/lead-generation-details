import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useLeadNurturing } from "../../context/LeadNurturingContext";

const LeadNurturingTimelineItem = ({ event, index, openIndex, setOpenIndex }) => {
  const { leadEmails, loadingMap, getLeadEmailData } = useLeadNurturing();

  const toggleAccordion = (currentIndex) => {
    if (openIndex === currentIndex) {
      // Close the accordion
      setOpenIndex(null);
    } else {
      // Open the accordion
      setOpenIndex(currentIndex);
      // Check if email is already loaded
      if (!leadEmails[event.id]) {
        // Fetch email content using context
        getLeadEmailData(event.id);
      }
    }
  };

  const isLoading = loadingMap[event.id];
  const emailData = leadEmails[event.id];

  return (
    <li className="mb-10 ms-6">
      {/* Dot Indicator */}
      <span
        className={`absolute flex items-center justify-center w-5 h-5 rounded-full -left-2.5 border-2 ${event.status === "completed"
          ? "bg-green-500 border-green-600"
          : event.status === "in-progress"
            ? "bg-blue-500 border-blue-600"
            : "bg-gray-400 border-gray-500"
          }`}
      ></span>

      {/* Event Header */}
      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => toggleAccordion(index)}
        role="button"
        tabIndex={0}
      >
        <div className="group-hover:text-blue-600 transition duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mt-1">
            {event.subject}
          </h3>
          <time className="text-sm text-gray-500">{event.sentDate}</time>
        </div>
        <div className="text-gray-600 transition-transform duration-300">
          {openIndex === index ? (
            <FaChevronDown className="text-xl group-hover:text-blue-600" />
          ) : (
            <FaChevronRight className="text-xl group-hover:text-blue-600" />
          )}
        </div>
      </div>

      {/* Accordion Content */}
      <div
        className={`transition-all duration-500 overflow-hidden ${openIndex === index
          ? "max-h-96 opacity-100 transform scale-y-100"
          : "max-h-0 opacity-0 transform scale-y-90"
          }`}
      >
        <div className="mt-3 text-gray-600">
          <p>
            <span className="font-semibold">CRM Status:</span>{" "}
            {event.crmStatus}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Metrics:</span>
          </p>
          <ul className="ml-4 list-disc text-sm">
            <li>
              <span className="font-semibold">Sent:</span> {event.metrics.sent}
            </li>
            <li>
              <span className="font-semibold">Opened:</span>{" "}
              {event.metrics.opened}
            </li>
            <li>
              <span className="font-semibold">Clicked:</span>{" "}
              {event.metrics.clicked}
            </li>
            <li>
              <span className="font-semibold">Replied:</span>{" "}
              {event.metrics.replied}
            </li>
          </ul>

          {/* Lazy Loaded Email Content */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800">Email Content:</h4>
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="ml-2 text-sm text-gray-500">Loading...</p>
              </div>
            ) : emailData ? (
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {emailData.content}
              </p>
            ) : (
              <p className="text-sm text-gray-700">
                No email content available.
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default LeadNurturingTimelineItem;
