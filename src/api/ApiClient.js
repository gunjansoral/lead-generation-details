import { leadData } from "../data/mockData";

class ApiClient {
  constructor(mockData) {
    this.mockData = mockData;
  }

  /**
   * Simulates fetching data with pagination.
   * @param {number} page - The current page number.
   * @param {number} size - The number of items per page.
   * @returns {Promise<Array>} - Promise resolving to paginated data.
   */
  async get(page, size) {
    const startIndex = (page - 1) * size;
    const data = this.mockData.slice(startIndex, startIndex + size);
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 500); // Simulate latency
    });
  }

  /**
   * Simulates fetching data by ID.
   * @param {string} id - The ID to fetch.
   * @returns {Promise<Object>} - Promise resolving to the item with the given ID.
   */
  async getById(id) {
    const item = this.mockData.find((item) => item.id === id);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (item) resolve(item);
        else reject(new Error(`Item with ID ${id} not found`));
      }, 500);
    });
  }

  /**
   * Simulates adding new data.
   * @param {Object} newItem - The item to add.
   * @returns {Promise<Object>} - Promise resolving to the added item.
   */
  async add(newItem) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockData.push(newItem);
        resolve(newItem);
      }, 500);
    });
  }

  /**
   * Simulates updating data by ID.
   * @param {string} id - The ID of the item to update.
   * @param {Object} updatedItem - The updated data.
   * @returns {Promise<Object>} - Promise resolving to the updated item.
   */
  async update(id, updatedItem) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.mockData.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.mockData[index] = { ...this.mockData[index], ...updatedItem };
          resolve(this.mockData[index]);
        } else {
          reject(new Error(`Item with ID ${id} not found`));
        }
      }, 500);
    });
  }

  /**
   * Simulates deleting data by ID.
   * @param {string} id - The ID of the item to delete.
   * @returns {Promise<string>} - Promise resolving to the deleted ID.
   */
  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.mockData.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.mockData.splice(index, 1);
          resolve(id);
        } else {
          reject(new Error(`Item with ID ${id} not found`));
        }
      }, 500);
    });
  }
}

export default ApiClient;
