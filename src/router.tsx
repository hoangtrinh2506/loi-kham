import Layout from "@/components/layout";
import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/404";
import { ErrorBoundary } from "./components/error-boundary";
import SymptomsPage from "./pages/symptoms";
import ResultsPage from "./pages/results";
import EmergencyPage from "./pages/emergency";
import MedicationPage from "./pages/medication";
import PrescriptionPage from "./pages/prescription";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/symptoms",
          element: <SymptomsPage />,
        },
        {
          path: "/results",
          element: <ResultsPage />,
        },
        {
          path: "/emergency",
          element: <EmergencyPage />,
        },
        {
          path: "/medication",
          element: <MedicationPage />,
        },
        {
          path: "/prescription",
          element: <PrescriptionPage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
      ErrorBoundary,
    },
  ],
  { basename: getBasePath() }
);

export function getBasePath() {
  const urlParams = new URLSearchParams(window.location.search);
  const appEnv = urlParams.get("env");

  if (
    import.meta.env.PROD ||
    appEnv === "TESTING_LOCAL" ||
    appEnv === "TESTING" ||
    appEnv === "DEVELOPMENT"
  ) {
    return `/zapps/${window.APP_ID}`;
  }

  return window.BASE_PATH || "";
}

export default router;
