import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import EventTypesPage from "./pages/EventTypesPage";
import EventTypeDetails from "./pages/EventTypeDetails";
import EventDetails from "./pages/EventDetails";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin
import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";

import Dashboard from "./admin/Dashboard";
import EventsManager from "./admin/EventsManager";
import EventTypesManager from "./admin/EventTypesManager";
import GalleryManager from "./admin/GalleryManager";
import TestimonialsManager from "./admin/TestimonialsManager";
import Enquiries from "./admin/Enquiries";
import ContentManager from "./admin/ContentManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Events listing */}
          <Route path="/events" element={<Events />} />

          {/* Event type listing */}
          <Route
            path="/event-types"
            element={<EventTypesPage />}
          />

          {/* Individual event details */}
          <Route
            path="/event/:slug"
            element={<EventDetails />}
          />

          {/* Event type details */}
          <Route
            path="/events/:slug"
            element={<EventTypeDetails />}
          />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />

        {/* Admin login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected admin panel */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            <Route
              path="events"
              element={<EventsManager />}
            />

            <Route
              path="event-types"
              element={<EventTypesManager />}
            />

            <Route
              path="gallery"
              element={<GalleryManager />}
            />

            <Route
              path="testimonials"
              element={<TestimonialsManager />}
            />

            <Route
              path="content"
              element={<ContentManager />}
            />

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
