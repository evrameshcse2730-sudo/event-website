import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import EventTypesPage from "./pages/EventTypesPage";
import EventTypeDetails from "./pages/EventTypeDetails";
import EventDetails from "./pages/EventDetails";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import EventsManager from "./admin/EventsManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/events"
            element={<Events />}
          />
<Route
  path="/admin/events"
  element={<EventsManager />}
/>
          <Route
            path="/event-types"
            element={<EventTypesPage />}
          />

          <Route
            path="/events/:slug"
            element={<EventTypeDetails />}
          />

          <Route
            path="/event/:slug"
            element={<EventDetails />}
          />

        </Route>
        <Route element={<AdminLayout />}>

  <Route
    path="/admin"
    element={<Dashboard />}
  />

</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;