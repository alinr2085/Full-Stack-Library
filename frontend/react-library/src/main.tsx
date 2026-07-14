import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { SessionManagement } from "./Auth/providers/SessionManagement.tsx";
import "./index.css";

const stripePromise = loadStripe(
  "pk_test_51TqB8xJcNHCrTmKew8gxsi5J2ZDmUOvWVRBhczRvJdKHn3NSMFC5X1F9cGtj6J7YuzUkaUqMRQMykcuxfX3vZ7gc00RBkARQOa",
);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SessionManagement>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </SessionManagement>
  </BrowserRouter>,
);
