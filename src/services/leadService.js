import { leadData } from "../data/mockData";
export const getPaginatedEvents = (events, start, count) => {
  return events.slice(start, start + count);
};


export const getLeadNurturingData = (page, size) => {
  const startIndex = (page - 1) * size;
  const data = leadData.history.slice(startIndex, startIndex + size); // Adjusted for leadData.history
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500); // Resolves after 500ms
  });
};