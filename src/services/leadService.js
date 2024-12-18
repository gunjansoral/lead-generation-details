export const getPaginatedEvents = (events, start, count) => {
  return events.slice(start, start + count);
};
