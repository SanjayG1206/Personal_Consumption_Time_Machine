import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { DataEntry } from "./pages/DataEntry";
import { TimeRewind } from "./pages/TimeRewind";
import { ImpactPlanner } from "./pages/ImpactPlanner";
import { Recommendations } from "./pages/Recommendations";
import { HabitDetection } from "./pages/HabitDetection";
import { DigitalTwin } from "./pages/DigitalTwin";
import { DailyReport } from "./pages/DailyReport";
import { Goals } from "./pages/Goals";
import { Reports } from "./pages/Reports";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { index: true, Component: Dashboard },
      { path: "data-entry", Component: DataEntry },
      { path: "time-rewind", Component: TimeRewind },
      { path: "impact-planner", Component: ImpactPlanner },
      { path: "recommendations", Component: Recommendations },
      { path: "habit-detection", Component: HabitDetection },
      { path: "digital-twin", Component: DigitalTwin },
      { path: "daily-report", Component: DailyReport },
      { path: "goals", Component: Goals },
      { path: "reports", Component: Reports },
      { path: "profile", Component: Profile },
    ],
  },
]);