import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { LandingPage } from "./pages/LandingPage";
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { DashboardPage } from "./pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "events", Component: DiscoveryPage },
      { path: "events/:id", Component: EventDetailsPage },
      { path: "register/:id", Component: RegistrationPage },
      { path: "dashboard", Component: DashboardPage },
    ],
  },
]);
