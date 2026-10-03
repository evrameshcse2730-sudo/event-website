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

import "./AdminLayout.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">

      {/* MOBILE HEADER */}

      <header className="admin-mobile-header">

        <button
          className="admin-menu-button"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>

        <div className="admin-mobile-logo">
          EVENT<span>.</span>
        </div>

      </header>

      {/* OVERLAY */}

      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "admin-sidebar--open" : ""
        }`}
      >

        <div className="admin-sidebar__top">

          <div className="admin-logo">
            EVENT<span>.</span>
          </div>

          <button
            className="admin-sidebar__close"
            onClick={() => setSidebarOpen(false)}
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
                    isActive ? "admin-nav-link--active" : ""
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

        </nav>

        <div className="admin-sidebar__bottom">

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="admin-main">

        <div className="admin-main__topbar">

          <div>
            <span>ADMIN PANEL</span>
          </div>

          <div className="admin-user">
            <div className="admin-user__avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <small>Website Manager</small>
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