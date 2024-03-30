import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CarContextProvider } from "./Context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CarContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CarContextProvider>
);
