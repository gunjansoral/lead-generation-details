import React, { createContext, useContext, useState } from "react";
import LeadNurturingApiClient from "../api/LeadNurturingApiClient";

// Create Context
const LeadNurturingContext = createContext();

// Provider Component
export const LeadNurturingProvider = ({ children }) => {
  const [leadData, setLeadData] = useState([]);
  const [leadEmails, setLeadEmails] = useState({}); // State to hold loaded emails
  const [loadingMap, setLoadingMap] = useState({}); // Map to track loading state for each email
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch lead history data with pagination
  const getLeadHistory = async (pageSize = 4) => {
    if (loadingMap.global || !hasMore) return;

    setLoadingMap((prev) => ({ ...prev, global: true })); // Global loading
    try {
      const newEvents = await LeadNurturingApiClient.getLeadHistory(
        page,
        pageSize
      );
      if (newEvents.length === 0) {
        setHasMore(false);
      } else {
        setLeadData((prev) => [...prev, ...newEvents]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching lead history data:", error);
    } finally {
      setLoadingMap((prev) => ({ ...prev, global: false }));
    }
  };

  // Fetch lead email data by ID
  const getLeadEmailData = async (id) => {
    // If email is already loaded, do nothing
    if (leadEmails[id]) {
      return;
    }
    // If already loading, do nothing
    if (loadingMap[id]) {
      return;
    }

    setLoadingMap((prev) => ({ ...prev, [id]: true })); // Set loading for specific email ID
    try {
      const emailData = await LeadNurturingApiClient.getLeadEmailById(id);
      setLeadEmails((prev) => ({ ...prev, [id]: emailData })); // Store email data
    } catch (error) {
      console.error(`Error fetching email data for ID ${id}:`, error);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [id]: false })); // Reset loading for specific email ID
    }
  };

  return (
    <LeadNurturingContext.Provider
      value={{
        leadData,
        leadEmails,
        loadingMap,
        hasMore,
        getLeadHistory,
        getLeadEmailData,
      }}
    >
      {children}
    </LeadNurturingContext.Provider>
  );
};

// Custom Hook to use LeadNurturingContext
export const useLeadNurturing = () => useContext(LeadNurturingContext);
