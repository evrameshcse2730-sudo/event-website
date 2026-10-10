import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

import { db } from "../firebase/config";
import "./UpcomingEvents.css";

function formatEventDate(value) {
  if (!value) return null;

  let date;

  if (typeof value?.toDate === "function") {
    date = value.toDate();
  } else if (typeof value === "string") {
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
    date: String(date.getDate()).padStart(2, "0"),
    month: date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase(),
    year: String(date.getFullYear()),
    timestamp: date.getTime(),
  };
}

function UpcomingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadUpcomingEvents() {
      try {
        setLoading(true);
        setError("");

        const eventsQuery = query(
          collection(db, "events"),
          where("publishStatus", "==", "published")
        );

        const snapshot = await getDocs(eventsQuery);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const events = snapshot.docs
          .map((document) => ({
            id: document.id,
            ...document.data(),
          }))
          .filter((event) => {
            const status = String(event.status || "").toLowerCase();

            return status !== "completed" && status !== "past";
          })
          .map((event) => {
            const formattedDate = formatEventDate(event.date);

            return {
              id: event.id,
              slug: event.slug || event.id,
              title: event.title || "Untitled Event",
              type: event.type || event.eventType || "Event",
              location: event.location || "Location to be announced",
              description: event.description || "",
              imageUrl: event.imageUrl || "",
              formattedDate,
              timestamp: formattedDate?.timestamp || 0,
            };
          })
          .filter(
            (event) =>
              event.formattedDate &&
              event.timestamp >= today.getTime()
          )
          .sort((a, b) => a.timestamp - b.timestamp)
          .slice(0, 3);

        if (isMounted) {
          setUpcomingEvents(events);
        }
      } catch (err) {
        console.error(
          "Upcoming events error:",
          err.code,
          err.message
        );

        if (isMounted) {
          setError("Unable to load events. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUpcomingEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="upcoming-events" id="upcoming">
      <div className="upcoming-container">
        <motion.div
          className="upcoming-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <div className="upcoming-label">
              <span>03</span>
              <i />
              WHAT'S COMING NEXT
            </div>

            <h2>
              UPCOMING
              <br />
              <span>EVENTS.</span>
            </h2>
          </div>

          <p>
            Discover the experiences we are preparing next.
            Explore an upcoming event and find all the details
            you need.
          </p>
        </motion.div>

        <div className="upcoming-list">
          {loading ? (
            <p className="upcoming-message">
              Loading upcoming events...
            </p>
          ) : error ? (
            <p className="upcoming-message">{error}</p>
          ) : upcomingEvents.length === 0 ? (
            <p className="upcoming-message">
              No upcoming events available right now.
            </p>
          ) : (
            upcomingEvents.map((event, index) => (
              <motion.article
                className="upcoming-card"
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <div className="event-date">
                  <span className="event-date-number">
                    {event.formattedDate.date}
                  </span>

                  <span className="event-date-month">
                    {event.formattedDate.month}
                  </span>

                  <span className="event-date-year">
                    {event.formattedDate.year}
                  </span>
                </div>

                {event.imageUrl && (
                  <div className="upcoming-visual">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="upcoming-content">
                  <span className="upcoming-type">
                    {event.type}
                  </span>

                  <h3>{event.title}</h3>

                  {event.description && (
                    <p>{event.description}</p>
                  )}

                  <div className="event-meta">
                    <span>
                      <CalendarDays size={14} />
                      {event.formattedDate.date}{" "}
                      {event.formattedDate.month}{" "}
                      {event.formattedDate.year}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {event.location}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/event/${event.slug}`}
                  className="upcoming-action"
                  aria-label={`View ${event.title}`}
                >
                  <ArrowUpRight size={21} />
                </Link>
              </motion.article>
            ))
          )}
        </div>

        <motion.div
          className="upcoming-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link to="/events">
            View All Events
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
