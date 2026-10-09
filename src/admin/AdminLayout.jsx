import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Layers3,
  Images,
  MessageSquareQuote,
  FileText,
  Mail,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";
import "./AdminLayout.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  const navigation = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Events",
      path: "/admin/events",
      icon: CalendarDays,
    },
    {
      label: "Event Types",
      path: "/admin/event-types",
      icon: Layers3,
    },
    {
      label: "Gallery",
      path: "/admin/gallery",
      icon: Images,
    },
    {
      label: "Testimonials",
      path: "/admin/testimonials",
      icon: MessageSquareQuote,
    },
    {
      label: "Website Content",
      path: "/admin/content",
      icon: FileText,
    },
    {
      label: "Enquiries",
      path: "/admin/enquiries",
      icon: Mail,
    },
  ];

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      // Actually sign out from Firebase
      await signOut(auth);

      // Redirect after Firebase logout
      navigate("/admin/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout error:", error);

      alert("Unable to logout. Please try again.");

      setLoggingOut(false);
    }
  };

  return (
    <div className="admin-layout">

      {/* ==========================================
          MOBILE HEADER
      ========================================== */}

      <header className="admin-mobile-header">

        <button
          type="button"
          className="admin-menu-button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>

        <div className="admin-mobile-logo">
          EVENT<span>.</span>
        </div>

      </header>


      {/* ==========================================
          OVERLAY
      ========================================== */}

      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen
            ? "admin-sidebar--open"
            : ""
        }`}
      >

        <div className="admin-sidebar__top">

          <div className="admin-logo">
            EVENT<span>.</span>
          </div>

          <button
            type="button"
            className="admin-sidebar__close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close admin menu"
          >
            <X size={20} />
          </button>

        </div>


        <div className="admin-sidebar__label">
          MANAGEMENT
        </div>


        <nav className="admin-sidebar__nav">

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `admin-nav-link ${
                    isActive
                      ? "admin-nav-link--active"
                      : ""
                  }`
                }
                onClick={() =>
                  setSidebarOpen(false)
                }
              >
                <Icon size={18} />

                <span>
                  {item.label}
                </span>
              </NavLink>
            );
          })}

        </nav>


        {/* ==========================================
            LOGOUT
        ========================================== */}

        <div className="admin-sidebar__bottom">

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <LogOut size={18} />

            <span>
              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </span>
          </button>

        </div>

      </aside>


      {/* ==========================================
          MAIN
      ========================================== */}

      <main className="admin-main">

        <div className="admin-main__topbar">

          <div>
            <span>
              ADMIN PANEL
            </span>
          </div>

          <div className="admin-user">

            <div className="admin-user__avatar">
              A
            </div>

            <div>
              <strong>
                Administrator
              </strong>

              <small>
                Website Manager
              </small>
            </div>

          </div>

        </div>


        <div className="admin-main__content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;