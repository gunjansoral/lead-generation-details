# Lead Generation Details

This repository contains the implementation for the **Lead Generation Details** assessment. The project is designed to display lead information, nurturing timelines, and email interactions with an enhanced user interface and experience.

## Features

1. **Accordion for Emails**
   - Emails are displayed in an expandable accordion.
   - Each email begins in an `unread` state and automatically transitions to `read` upon expanding.

2. **Show More Button**
   - Long email content is truncated initially and can be expanded using a **Show More** button. This feature improves user experience by keeping the UI clean.

3. **Mark Important**
   - Emails can be marked as "Important" for better prioritization. A "★" icon is displayed for important emails.

4. **Dynamic Loading**
   - Email content is lazy-loaded when an accordion is expanded, ensuring efficient data handling.

5. **Loading Spinner**
   - A spinner is displayed while the email content is being fetched, providing a smooth loading experience.

6. **Responsive Design**
   - The application adapts seamlessly to various screen sizes.

7. **Improved Code Structure**
   - Modular and reusable components for better scalability and maintainability.

8. **Additional Features Added**
   - Features such as **Show More** and **Mark Important** were added to enhance the user experience beyond the basic requirements.

---

## Project Setup

To run this project on your local machine, follow these steps:

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager) or **yarn**

### Steps to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/gunjansoral/lead-generation-details.git
2. Navigate to the project directory:

   ```bash
Copy code
cd lead-generation-details
3. Pull the latest changes from the main branch:

    ```bash
Copy code
git pull origin main
3. Install dependencies:

    ```bash
Copy code
npm install
4. Start the development server:

    ```bash
Copy code
npm run dev
5. Open your browser and visit:

    ```bash
Copy code
http://localhost:5173
Note: By default, Vite uses port 5173. If this port is already in use, Vite will assign a different port, which will be displayed in the terminal when you run npm run dev.
