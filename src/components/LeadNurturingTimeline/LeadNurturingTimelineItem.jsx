import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useLeadNurturing } from "../../context/LeadNurturingContext";

const LeadNurturingTimelineItem = ({ event, index, openIndex, setOpenIndex }) => {
  const { leadEmails, loadingMap, getLeadEmailData } = useLeadNurturing();
  const [localStatus, setLocalStatus] = useState(event.status);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = (currentIndex) => {
    if (openIndex === currentIndex) {
      // Close the accordion
      setOpenIndex(null);
    } else {
      // Open the accordion
      setOpenIndex(currentIndex);
      // Check if email is already loaded
      if (!leadEmails[event.id]) {
        getLeadEmailData(event.id);
      }
      // Mark as read if it is unread
      if (localStatus === "unread") {
        setLocalStatus("read");
      }
    }
  };

  const toggleStatus = () => {
    setLocalStatus((prevStatus) =>
      prevStatus === "important" ? "read" : "important"
    );
  };

  const isLoading = loadingMap[event.id];
  const emailData = leadEmails[event.id];

  return (
    <li className="mb-10 ms-6 w-[600px]">
      {/* Dot Indicator */}
      <span
        className={`absolute flex items-center justify-center w-5 h-5 rounded-full -left-2.5 border-2 ${localStatus === "read"
          ? "bg-green-500 border-green-600"
          : localStatus === "important"
            ? "bg-blue-500 border-blue-600"
            : "bg-gray-400 border-gray-500"
          }`}
      >
        {localStatus === "important" && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-white px-1.5 py-1 rounded-full shadow">
            ★
          </span>
        )}
      </span>

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

      {/* Always Visible Content */}
      <div className="mt-3 bg-white shadow rounded-md p-4">
        {/* CRM Status */}
        <p className="text-sm mt-2 text-red-500">
          <span className="font-medium">CRM:</span> {event.crmStatus}
        </p>

        {/* Metrics Section */}
        <div className="mt-4 grid grid-cols-4 text-center text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-800">Sent</p>
            <p>{event.metrics.sent}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Opened</p>
            <p>{event.metrics.opened}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Clicked</p>
            <p>{event.metrics.clicked}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Replied</p>
            <p>{event.metrics.replied}</p>
          </div>
        </div>
      </div>

      {/* Lazy Loaded Email Content */}
      {openIndex === index && (
        <div
          className={`mt-4 max-w-[600px] transition-all duration-500 overflow-hidden ${isExpanded ? "max-h-[none]" : "max-h-[500px]"
            }`}
        >
          <h4 className="font-semibold text-gray-800">Email Content:</h4>
          {isLoading ? (
            // Skeleton Loader
            <div className="space-y-3 mt-3">
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
          ) : emailData ? (
            // Render the HTML content safely
            <div
              className="text-sm text-gray-700 overflow-hidden text-ellipsis"
              dangerouslySetInnerHTML={{ __html: emailData.content }}
            ></div>
          ) : (
            <p className="text-sm text-gray-700">No email content available.</p>
          )}
        </div>
      )}

      {/* Read More / Collapse Button */}
      {openIndex === index && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`relative text-sm font-medium px-6 py-2 rounded-full transition-all duration-300 
        ${isExpanded ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "bg-gray-200 text-blue-500"} 
        hover:from-blue-400 hover:to-purple-400 hover:text-white shadow-lg`}
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 rounded-full"
              style={{
                animation: isExpanded ? "fadeIn 0.5s ease-in-out forwards" : "fadeOut 0.5s ease-in-out forwards",
              }}
            ></span>
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>
      )}


      {/* Toggle Status Button */}
      {openIndex === index && (
        <button
          onClick={toggleStatus}
          className={`mt-4 px-4 py-2 text-sm font-medium ${localStatus === "important"
            ? "border-blue-500 border-2 text-blue-600"
            : "bg-blue-500 border-2 hover:bg-blue-600 focus:outline-none text-white"
            }`}
        >
          {localStatus === "important" ? "Mark Unimportant" : "Mark Important"}
        </button>
      )}
    </li>
  );
};

export default LeadNurturingTimelineItem;
