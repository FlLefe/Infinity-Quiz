import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./services/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ErrorBoundary>
);
