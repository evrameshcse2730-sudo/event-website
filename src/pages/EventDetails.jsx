
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";
import "./EventDetails.css";

function formatEventDate(value) {
  if (!value) return "Date to be announced";

  let date;

  if (typeof value?.toDate === "function") {
    date = value.toDate();
  } else if (typeof value === "string") {
    date = new Date(`${value}T12:00:00`);
  } else if (value instanceof Date) {
    date = value;
  } else {
    return "Date to be announced";
  }

  if (Number.isNaN(date.getTime())) {
    return "Date to be announced";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const defaultHighlights = [
  "Careful event planning",
  "Guest experience",
  "Professional coordination",
  "Event execution",
];

function EventDetails() {
  const { slug } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadEvent = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const eventsQuery = query(
          collection(db, "events"),
          where("publishStatus", "==", "published")
        );

        const snapshot = await getDocs(eventsQuery);

        const matchedDocument = snapshot.docs.find((document) => {
          const data = document.data();
          return (data.slug || document.id) === slug;
        });

        if (!matchedDocument) {
          if (isMounted) setNotFound(true);
          return;
        }

        const data = matchedDocument.data();
        const image =
  data.imageUrl ||
  data.image ||
  data.coverImage ||
  (Array.isArray(data.imageUrls) ? data.imageUrls[0] : "") ||
  "";

        const imageUrls = [
          ...new Set([
            ...(image ? [image] : []),
            ...(Array.isArray(data.imageUrls) ? data.imageUrls : []),
          ].filter(
            (url) => typeof url === "string" && url.trim() !== ""
          )),
        ];

        const eventDetails = {
          id: matchedDocument.id,
          title: data.title || "Untitled Event",
          type: data.type || data.eventType || "Event",
          date: formatEventDate(data.date),
          location: data.location || "Location to be announced",
          status:
            ["completed", "past"].includes(
              String(data.status || "").toLowerCase()
            )
              ? "COMPLETED"
              : "UPCOMING",
          description: data.description || "",
          intro:
            data.intro ||
            data.description ||
            "Discover the planning and experience behind this event.",
          highlights: Array.isArray(data.highlights)
            ? data.highlights
            : defaultHighlights,
          image,
          imageUrls,
        };

        if (isMounted) {
          setEvent(eventDetails);
          setNotFound(false);
        }
      } catch (error) {
        console.error("Error loading event details:", error);
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadEvent();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="event-details-not-found">
        <div className="container">
          <span className="section-label">EVENT DETAILS</span>
          <h1>LOADING EVENT...</h1>
        </div>
      </main>
    );
  }

  if (notFound || !event) {
    return (
      <main className="event-details-not-found">
        <div className="container">
          <span className="section-label">EVENT NOT FOUND</span>
          <h1>THIS EVENT DOESN’T EXIST.</h1>
          <p>
            This event may not be published or the link may be incorrect.
          </p>
          <Link to="/events">
            <ArrowLeft size={18} />
            BACK TO EVENTS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="event-details">
      {/* HERO */}
      <section className="event-details__hero">
        <div
          className="event-details__hero-bg"
          style={
            event.image
              ? {
                  backgroundImage: `url("${event.image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        />

        <div className="container">
          <Link to="/events" className="event-details__back">
            <ArrowLeft size={17} />
            BACK TO EVENTS
          </Link>

          <motion.div
            className="event-details__hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="event-details__status">
              <span />
              {event.status}
            </div>

            <span className="section-label">{event.type}</span>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
          </motion.div>
        </div>
      </section>

      {/* EVENT INFO */}
      <section className="event-details__info section">
        <div className="container">
          <div className="event-details__info-grid">
            <div className="event-details__intro">
              <span className="section-label">THE EXPERIENCE</span>
              <h2 className="section-title">
                DESIGNED FOR
                <br />
                <span>THE MOMENT.</span>
              </h2>
              <p>{event.intro}</p>
            </div>

            <div className="event-details__meta">
              <div className="event-details__meta-item">
                <CalendarDays size={20} />
                <div>
                  <span>DATE</span>
                  <strong>{event.date}</strong>
                </div>
              </div>

              <div className="event-details__meta-item">
                <MapPin size={20} />
                <div>
                  <span>LOCATION</span>
                  <strong>{event.location}</strong>
                </div>
              </div>

              <div className="event-details__meta-item">
                <div className="event-details__meta-number">01</div>
                <div>
                  <span>EVENT TYPE</span>
                  <strong>{event.type}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VISUAL */}
      <section className="event-details__visual">
        <div className="container">
          <div
            className="event-details__visual-box"
            style={
              event.image
                ? {
                    backgroundImage: `linear-gradient(rgba(7,26,23,.35), rgba(7,26,23,.7)), url("${event.image}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            <div className="event-details__visual-number">
              EVENT EXPERIENCE
            </div>
            <div className="event-details__visual-title">
              {event.title}
            </div>
          </div>
        </div>
      </section>

      {/* MULTIPLE IMAGE GALLERY */}
      {event.imageUrls.length > 0 && (
        <section className="event-details__gallery section">
          <div className="container">
            <div className="event-details__gallery-header">
              <span className="section-label">EVENT MOMENTS</span>
              <h2 className="section-title">
                THE GALLERY<span>.</span>
              </h2>
              <p>
                Explore the moments and memories from this event.
              </p>
            </div>

            <div className="event-details__gallery-grid">
              {event.imageUrls.map((url, index) => (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="event-details__gallery-item"
                  key={`${url}-${index}`}
                  aria-label={`Open event photo ${index + 1} in a new tab`}
                >
                  <img
                    src={url}
                    alt={`${event.title} - photo ${index + 1}`}
                    loading="lazy"
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HIGHLIGHTS */}
      <section className="event-details__highlights section">
        <div className="container">
          <div className="event-details__highlights-header">
            <div>
              <span className="section-label">EVENT DETAILS</span>
              <h2 className="section-title">
                WHAT WE
                <br />
                <span>CREATE.</span>
              </h2>
            </div>

            <p>
              Every element is planned with purpose, from the first idea
              to the final guest experience.
            </p>
          </div>

          <div className="event-details__highlight-list">
            {event.highlights.map((item, index) => (
              <motion.div
                className="event-highlight"
                key={`${item}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
                <ArrowUpRight size={20} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="event-details__cta">
        <div className="container">
          <span className="section-label">PLAN YOUR EXPERIENCE</span>
          <h2>
            WANT TO CREATE
            <br />
            <span>SOMETHING LIKE THIS?</span>
          </h2>
          <Link to="/contact">
            START A CONVERSATION
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default EventDetails;
