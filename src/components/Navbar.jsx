import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const navItems = [
  { label: "Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Events", section: "events" },
  { label: "Gallery", section: "gallery" },
  { label: "Contact", section: "contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (sectionId) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn(`Home section not found: ${sectionId}`);
    }
  };

  const handleNavigation = (item) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/", {
        state: { scrollTo: item.section },
      });
      return;
    }

    scrollToSection(item.section);
  };

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionId = location.state?.scrollTo;
    if (!sectionId) return;

    let frameOne;
    let frameTwo;

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        scrollToSection(sectionId);

        navigate("/", {
          replace: true,
          state: null,
        });
      });
    });

    return () => {
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
    };
  }, [location.pathname, location.state, navigate]);

  const handlePlanEvent = () => {
    handleNavigation({
      label: "Contact",
      section: "contact",
    });
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    handleNavigation(navItems[0]);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a
          href="/"
          className="brand"
          onClick={handleLogoClick}
          aria-label="Event Studio Home"
        >
          <span className="brand-mark">E</span>

          <span className="brand-text">
            EVENT
            <small>STUDIO</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={
                item.section === "home"
                  ? "/"
                  : `/#${item.section}`
              }
              onClick={(event) => {
                event.preventDefault();
                handleNavigation(item);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="navbar-cta"
          onClick={handlePlanEvent}
        >
          Plan Your Event
          <ArrowUpRight size={16} />
        </button>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={
                  item.section === "home"
                    ? "/"
                    : `/#${item.section}`
                }
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigation(item);
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span>0{index + 1}</span>
                {item.label}
              </motion.a>
            ))}

            <button
              type="button"
              className="mobile-cta"
              onClick={handlePlanEvent}
            >
              Plan Your Event
              <ArrowUpRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
