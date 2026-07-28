import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { store } from "./app/store";
import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 2500,

          style: {
            background: "#FFFFFF",
            color: "#4C1D95",
            borderRadius: "16px",
            padding: "16px",
            fontWeight: "600",
            boxShadow: "0 15px 35px rgba(124,58,237,.15)",
          },

          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#FFFFFF",
            },
          },

          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
    </Provider>
  </React.StrictMode>
);