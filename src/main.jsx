import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        elements: {
          card: "bg-base-100",
          formButtonPrimary: "bg-secondary",
          footerActionLink: "text-secondary",
          formFieldInput: "bg-grey accent-transparent",
          profileSectionPrimaryButton: "hover:bg-primary text-secondary",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
