import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

// ==========================================
// PUBLIC PAGES
// ==========================================

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import EventTypesPage from "./pages/EventTypesPage";
import EventTypeDetails from "./pages/EventTypeDetails";
import EventDetails from "./pages/EventDetails";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// ==========================================
// ADMIN
// ==========================================

import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";

import Dashboard from "./admin/Dashboard";
import EventsManager from "./admin/EventsManager";
import EventTypesManager from "./admin/EventTypesManager";
import GalleryManager from "./admin/GalleryManager";
import TestimonialsManager from "./admin/TestimonialsManager";
import Enquiries from "./admin/Enquiries";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==========================================
            PUBLIC WEBSITE
        ========================================== */}

        <Route element={<Layout />}>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* EVENTS */}
          <Route
            path="/events"
            element={<Events />}
          />

          {/* EVENT TYPES */}
          <Route
            path="/event-types"
            element={<EventTypesPage />}
          />

          {/* EVENT TYPE DETAILS */}
          <Route
            path="/events/:slug"
            element={<EventTypeDetails />}
          />

          {/* INDIVIDUAL EVENT */}
          <Route
            path="/event/:slug"
            element={<EventDetails />}
          />

          {/* GALLERY */}
          <Route
            path="/gallery"
            element={<Gallery />}
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={<Contact />}
          />

        </Route>


        {/* ==========================================
            PUBLIC 404
        ========================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />


        {/* ==========================================
            ADMIN LOGIN
        ========================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ==========================================
            PROTECTED ADMIN PANEL
        ========================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            {/* DASHBOARD */}
            <Route
              index
              element={<Dashboard />}
            />

            {/* EVENTS */}
            <Route
              path="events"
              element={<EventsManager />}
            />

            {/* EVENT TYPES */}
            <Route
              path="event-types"
              element={<EventTypesManager />}
            />

            {/* GALLERY */}
            <Route
              path="gallery"
              element={<GalleryManager />}
            />

            {/* TESTIMONIALS */}
            <Route
              path="testimonials"
              element={<TestimonialsManager />}
            />

            {/* ENQUIRIES */}
            <Route
              path="enquiries"
              element={<Enquiries />}
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;