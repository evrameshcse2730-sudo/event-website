import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";

import { db } from "../firebase/config";
import "./Events.css";

function getEventDate(value) {
  if (!value) return null;

  let date;

  if (typeof value?.toDate === "function") {
    date = value.toDate();
  } else if (typeof value === "string") {
    // Supports YYYY-MM-DD and ISO date strings.
    date = /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(`${value}T12:00:00`)
      : new Date(value);
  } else if (value instanceof Date) {
    date = value;
  } else {
    return null;
  }

  if (Number.isNaN(date.getTime())) return null;

  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase(),
    year: String(date.getFullYear()),
    timestamp: date.getTime(),
  };
}

function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchEvents() {
      try {
        setLoading(true);
        setError("");

        const eventsQuery = query(
          collection(db, "events"),
          where("publishStatus", "==", "published")
        );

        const snapshot = await getDocs(eventsQuery);

        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        data.sort((a, b) => {
          const dateA = getEventDate(a.date)?.timestamp ?? 0;
          const dateB = getEventDate(b.date)?.timestamp ?? 0;
          return dateB - dateA;
        });

        if (active) setEvents(data);
      } catch (err) {
        console.error("Events loading error:", err.code, err.message);

        if (active) {
          setError(
            err.code === "permission-denied"
              ? "Events access denied. Please check Firestore Rules."
              : "Unable to load events. Please try again later."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchEvents();

    return () => {
      active = false;
    };
  }, []);

  const categories = [
    "All",
    ...new Set(
      events
        .map((event) => event.type || event.eventType)
        .filter(Boolean)
    ),
  ];

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter(
          (event) => (event.type || event.eventType) === filter
        );

  return (
    <main className="events-page">
      <section className="events-page__hero">
        <div className="events-page__hero-grid" />

        <div className="container events-page__hero-content">
          <Link to="/" className="events-page__home-link">
            <span aria-hidden="true">←</span>
            BACK TO HOME
          </Link>

          <p className="section-label">OUR EVENT COLLECTION</p>

          <h1>
            Discover
            <br />
            Our <span>Events.</span>
          </h1>

          <p>
            Explore extraordinary celebrations, meaningful gatherings,
            and memorable experiences created with care and creativity.
          </p>
        </div>
      </section>

      <section className="events-page__content">
        <div className="container">
          <div className="events-page__top">
            <div className="events-page__heading">
              <p className="section-label">EXPLORE OUR EXPERIENCES</p>
              <h2>Every Moment Matters</h2>
              <p>Discover the events we bring to life.</p>
            </div>

            <div className="events-page__filters">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={filter === category ? "active" : ""}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <p className="events-page__message">Loading events...</p>
          )}

          {!loading && error && (
            <p className="events-page__message">{error}</p>
          )}

          {!loading && !error && filteredEvents.length === 0 && (
            <p className="events-page__message">
              No published events available in this category.
            </p>
          )}

          {!loading && !error && filteredEvents.length > 0 && (
            <div className="events-page__list">
              {filteredEvents.map((event, index) => {
                const date = getEventDate(event.date);
                const status = String(event.status || "").toLowerCase();

                const completed =
                  status === "completed" || status === "past";

                return (
                  <motion.article
                    className="event-card"
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.06, 0.25),
                    }}
                  >
                    <div className="event-card__date">
                      <strong>{date?.day || "--"}</strong>
                      <span>{date?.month || "TBA"}</span>
                      {date?.year && <small>{date.year}</small>}
                    </div>

                    <div className="event-card__visual">
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl}
                          alt={event.title || "Event"}
                          loading="lazy"
                        />
                      )}

                      <span className="event-card__number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="event-card__visual-overlay">
                        <span>
                          {event.type || event.eventType || "Event"}
                        </span>
                      </div>
                    </div>

                    <div className="event-card__content">
                      <div className="event-card__status">
                        <span
                          className={`status-dot ${
                            completed ? "completed" : "upcoming"
                          }`}
                        />
                        {completed ? "COMPLETED" : "UPCOMING EVENT"}
                      </div>

                      <h3>{event.title || "Untitled Event"}</h3>

                      {event.description && (
                        <p>{event.description}</p>
                      )}

                      <div className="event-card__meta">
                        {date && (
                          <span>
                            <CalendarDays size={15} />
                            {date.day} {date.month} {date.year}
                          </span>
                        )}

                        {event.location && (
                          <span>
                            <MapPin size={15} />
                            {event.location}
                          </span>
                        )}
                      </div>

                      <Link
                        to={`/event/${event.slug || event.id}`}
                        className="event-card__link"
                      >
                        VIEW EVENT DETAILS
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Events;
