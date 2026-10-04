import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import EventTypesPage from "./pages/EventTypesPage";
import EventTypeDetails from "./pages/EventTypeDetails";
import EventDetails from "./pages/EventDetails";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

// Admin
import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import EventsManager from "./admin/EventsManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            PUBLIC WEBSITE
        ===================================== */}

        <Route element={<Layout />}>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* About */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* Events */}
          <Route
            path="/events"
            element={<Events />}
          />

          {/* Gallery */}
          <Route
            path="/gallery"
            element={<Gallery />}
          />

          {/* Contact */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* Event Types */}
          <Route
            path="/event-types"
            element={<EventTypesPage />}
          />

          {/* Event Type Details */}
          <Route
            path="/events/:slug"
            element={<EventTypeDetails />}
          />

          {/* Individual Event Details */}
          <Route
            path="/event/:slug"
            element={<EventDetails />}
          />

        </Route>


        {/* =====================================
            ADMIN LOGIN
        ===================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =====================================
            PROTECTED ADMIN PANEL
        ===================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            {/* Admin Dashboard */}
            <Route
              index
              element={<Dashboard />}
            />

            {/* Events Manager */}
            <Route
              path="events"
              element={<EventsManager />}
            />

          </Route>

        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;