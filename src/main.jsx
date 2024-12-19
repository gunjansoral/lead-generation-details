import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LeadNurturingProvider } from "./context/LeadNurturingContext";

createRoot(document.getElementById("root")).render(
  <LeadNurturingProvider>
    <App />
  </LeadNurturingProvider>
);
