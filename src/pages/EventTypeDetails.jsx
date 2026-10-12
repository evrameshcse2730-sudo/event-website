import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import "./EventTypeDetails.css";

const fallbackEventTypes = {
  "corporate-events": {
    title: "Corporate Events",
    label: "CORPORATE EXPERIENCES",
    description:
      "Professional events designed to bring teams, leaders, partners and businesses together through meaningful experiences.",
    intro:
      "From corporate gatherings and annual celebrations to leadership events and business experiences, we create environments that support your purpose and your people.",
    services: [
      "Corporate Meetings",
      "Annual Celebrations",
      "Team Events",
      "Leadership Gatherings",
      "Award Ceremonies",
      "Business Experiences",
    ],
  },
  weddings: {
    title: "Weddings & Celebrations",
    label: "WEDDINGS & CELEBRATIONS",
    description:
      "Beautifully planned celebrations designed around emotions, traditions, people and unforgettable moments.",
    intro:
      "Every celebration has its own personality. We bring together planning, styling, coordination and execution to create a celebration that feels uniquely yours.",
    services: [
      "Wedding Planning",
      "Reception Events",
      "Engagements",
      "Decor & Styling",
      "Guest Experiences",
      "Celebration Management",
    ],
  },
  conferences: {
    title: "Conferences & Summits",
    label: "CONFERENCES & SUMMITS",
    description:
      "Engaging professional environments designed for knowledge sharing, networking and meaningful conversations.",
    intro:
      "We create conference experiences where content, people, production and atmosphere work together to make every interaction count.",
    services: [
      "Conference Planning",
      "Summit Management",
      "Stage & Production",
      "Speaker Coordination",
      "Audience Experience",
      "Event Operations",
    ],
  },
  "product-launches": {
    title: "Product Launches",
    label: "PRODUCT LAUNCHES",
    description:
      "Creative launch experiences designed to introduce products and brands with energy, clarity and impact.",
    intro:
      "A product launch is more than an announcement. We create an environment that builds anticipation, communicates the story and gives the audience something to remember.",
    services: [
      "Launch Strategy",
      "Brand Experiences",
      "Stage & Production",
      "Product Reveal",
      "Guest Management",
      "Launch Events",
    ],
  },
  "cultural-events": {
    title: "Cultural Events",
    label: "CULTURAL EXPERIENCES",
    description:
      "Immersive experiences that bring together creativity, tradition, entertainment and community.",
    intro:
      "We design cultural experiences that respect the character of the occasion while creating an engaging environment for every generation.",
    services: [
      "Cultural Programs",
      "Festival Events",
      "Stage Shows",
      "Traditional Celebrations",
      "Entertainment",
      "Event Coordination",
    ],
  },
};

function makeSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function EventTypeDetails() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadEventType = async () => {
      try {
        const snapshot = await getDocs(collection(db, "eventTypes"));

        const matchingDoc = snapshot.docs
          .map((document) => ({
            id: document.id,
            ...document.data(),
          }))
          .find((item) => {
            const itemSlug = item.slug || makeSlug(item.title);
            return itemSlug === slug && item.status === "published";
          });

        if (!mounted) return;

        if (matchingDoc) {
          const fallback =
            fallbackEventTypes[slug] ||
            fallbackEventTypes[makeSlug(matchingDoc.title)] ||
            {};

          setEvent({
            ...fallback,
            ...matchingDoc,
            title: matchingDoc.title || fallback.title || "Event Type",
            label:
              matchingDoc.label ||
              fallback.label ||
              (matchingDoc.title || "EVENT EXPERIENCE").toUpperCase(),
            description:
              matchingDoc.description || fallback.description || "",
            intro: matchingDoc.intro || fallback.intro || matchingDoc.description || "",
            services:
              Array.isArray(matchingDoc.services) && matchingDoc.services.length
                ? matchingDoc.services
                : fallback.services || [],
            imageUrl:
              matchingDoc.imageUrl ||
              matchingDoc.image ||
              matchingDoc.coverImage ||
              "",
            videoUrl: matchingDoc.videoUrl || matchingDoc.video || "",
          });
        } else {
          setEvent(fallbackEventTypes[slug] || null);
        }
      } catch (error) {
        console.error("Error loading event type details:", error);

        if (mounted) {
          setEvent(fallbackEventTypes[slug] || null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    setLoading(true);
    loadEventType();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="event-type-details">
        <div className="container event-type-details__state">
          Loading event details...
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="event-type-details">
        <div className="container event-type-details__state">
          <h1>Event type not found</h1>
          <Link to="/event-types">View all event types</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="event-type-details">
      <section className="event-type-details__hero">
        <div className="container">
          <Link to="/event-types" className="event-type-details__back">
            <ArrowLeft size={16} />
            ALL EVENT TYPES
          </Link>

          <motion.span
            className="event-type-details__label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {event.label}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {event.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {event.description}
          </motion.p>
        </div>
      </section>

      <section className="event-type-details__intro">
        <div className="container">
          <div className="event-type-details__intro-grid">
            <span className="section-label">THE EXPERIENCE</span>

            <div>
              <h2>
                DESIGNED AROUND
                <br />
                YOUR <span>VISION.</span>
              </h2>

              <p>{event.intro}</p>

              <Link to="/contact" className="event-type-details__cta">
                PLAN THIS EVENT
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Actual event type image or video */}
      <section className="event-type-details__visual-section">
        <div className="container">
          <div className="event-type-details__visual">
            {event.videoUrl ? (
              <video
                className="event-type-details__media"
                src={event.videoUrl}
                poster={event.imageUrl || undefined}
                controls
                playsInline
                preload="metadata"
                aria-label={`${event.title} video`}
              />
            ) : event.imageUrl ? (
              <img
                className="event-type-details__media"
                src={event.imageUrl}
                alt={event.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.add("is-visible");
                }}
              />
            ) : null}

            <span
              className={`event-type-details__visual-placeholder ${
                !event.imageUrl && !event.videoUrl ? "is-visible" : ""
              }`}
            >
              {event.imageUrl || event.videoUrl
                ? "Event media could not be displayed"
                : "Add an image or video in Admin Panel → Event Types"}
            </span>
          </div>
        </div>
      </section>

      <section className="event-type-details__services">
        <div className="container">
          <div className="event-type-details__services-head">
            <span className="section-label">WHAT WE HANDLE</span>

            <h2>
              EVERYTHING
              <br />
              <span>CONNECTED.</span>
            </h2>
          </div>

          <div className="event-type-details__service-list">
            {event.services.map((service, index) => (
              <div className="event-type-details__service" key={service}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service}</h3>
                <Check size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="event-type-details__bottom">
        <div className="container">
          <span>READY TO START?</span>

          <h2>
            LET'S CREATE
            <br />
            SOMETHING <span>MEMORABLE.</span>
          </h2>

          <Link to="/contact">
            START A CONVERSATION
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default EventTypeDetails;