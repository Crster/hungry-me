import { createBrowserRouter } from "react-router";
import HomePage from "./pages/Home";
import RestaurantPage from "./pages/Restaurant";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/restaurant",
    Component: RestaurantPage,
  },
]);
