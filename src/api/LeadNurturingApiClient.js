import ApiClient from "./ApiClient";
import { leadData, leadDataEmails } from "../data/mockData";

// Initialize API Clients for lead data and email data
const LeadNurturingApiClient = {
  leadHistoryClient: new ApiClient(leadData.history),
  leadEmailClient: new ApiClient(leadDataEmails.emails),

  /**
   * Fetch lead history with pagination.
   * @param {number} page - Page number.
   * @param {number} size - Number of items per page.
   * @returns {Promise<Array>} - Paginated lead history.
   */
  getLeadHistory(page, size) {
    return this.leadHistoryClient.get(page, size);
  },

  /**
   * Fetch lead email by ID.
   * @param {string} id - Email ID to fetch.
   * @returns {Promise<Object>} - Email data with the given ID.
   */
  getLeadEmailById(id) {
    return this.leadEmailClient.getById(id);
  },

  /**
   * Add a new lead history event.
   * @param {Object} newEvent - New event data.
   * @returns {Promise<Object>} - Added lead history event.
   */
  addLeadHistoryEvent(newEvent) {
    return this.leadHistoryClient.add(newEvent);
  },

  /**
   * Update a lead history event by ID.
   * @param {string} id - Event ID to update.
   * @param {Object} updatedEvent - Updated event data.
   * @returns {Promise<Object>} - Updated lead history event.
   */
  updateLeadHistoryEvent(id, updatedEvent) {
    return this.leadHistoryClient.update(id, updatedEvent);
  },

  /**
   * Delete a lead history event by ID.
   * @param {string} id - Event ID to delete.
   * @returns {Promise<string>} - Deleted event ID.
   */
  deleteLeadHistoryEvent(id) {
    return this.leadHistoryClient.delete(id);
  },
};

export default LeadNurturingApiClient;
