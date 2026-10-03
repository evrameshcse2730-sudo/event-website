import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import "./Events.css";

const eventsData = [
  {
    id: 1,
    slug: "business-summit-2026",
    date: "18",
    month: "OCT",
    year: "2026",
    title: "Business Summit 2026",
    type: "Corporate Event",
    location: "Hyderabad",
    status: "upcoming",
    description:
      "A premium gathering bringing business leaders, ideas and meaningful conversations together.",
  },
  {
    id: 2,
    slug: "wedding-celebration",
    date: "25",
    month: "OCT",
    year: "2026",
    title: "Wedding Celebration",
    type: "Wedding",
    location: "Vijayawada",
    status: "upcoming",
    description:
      "A beautifully planned celebration designed around people, emotions and unforgettable moments.",
  },
  {
    id: 3,
    slug: "brand-launch-experience",
    date: "08",
    month: "NOV",
    year: "2026",
    title: "Brand Launch Experience",
    type: "Product Launch",
    location: "Bengaluru",
    status: "upcoming",
    description:
      "A creative launch experience designed to introduce a brand with energy and impact.",
  },
  {
    id: 4,
    slug: "leadership-summit-2025",
    date: "14",
    month: "DEC",
    year: "2025",
    title: "Leadership Summit",
    type: "Conference",
    location: "Hyderabad",
    status: "completed",
    description:
      "A high-energy leadership gathering focused on ideas, collaboration and meaningful connections.",
  },
  {
    id: 5,
    slug: "annual-cultural-festival",
    date: "22",
    month: "NOV",
    year: "2025",
    title: "Annual Cultural Festival",
    type: "Cultural Event",
    location: "Warangal",
    status: "completed",
    description:
      "A vibrant cultural experience bringing together performances, traditions and community.",
  },
  {
    id: 6,
    slug: "corporate-awards-night",
    date: "05",
    month: "OCT",
    year: "2025",
    title: "Corporate Awards Night",
    type: "Corporate Event",
    location: "Bengaluru",
    status: "completed",
    description:
      "An elegant corporate celebration created to recognize achievements and build lasting memories.",
  },
];

function Events() {
  const [filter, setFilter] = useState("all");

  const filteredEvents =
    filter === "all"
      ? eventsData
      : eventsData.filter((event) => event.status === filter);

  return (
    <main className="events-page">

      {/* HERO */}

      <section className="events-page__hero">
        <div className="events-page__hero-grid" />

        <div className="container">
          <motion.div
            className="events-page__hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">OUR EVENTS</span>

            <h1>
              EXPERIENCES
              <br />
              <span>IN MOTION.</span>
            </h1>

            <p>
              From intimate celebrations to large-scale experiences,
              every event is carefully designed, planned and executed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EVENTS */}

      <section className="events-page__content section">
        <div className="container">

          <div className="events-page__top">

            <div>
              <span className="section-label">EVENT PORTFOLIO</span>

              <h2 className="section-title">
                MOMENTS WE
                <br />
                <span>CREATE.</span>
              </h2>
            </div>

            <div className="events-page__filters">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                All Events
              </button>

              <button
                className={filter === "upcoming" ? "active" : ""}
                onClick={() => setFilter("upcoming")}
              >
                Upcoming
              </button>

              <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>

          </div>

          <div className="events-page__list">

            {filteredEvents.map((event, index) => (
              <motion.article
                className="event-card"
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                }}
              >

                <div className="event-card__date">
                  <strong>{event.date}</strong>
                  <span>{event.month}</span>
                  <small>{event.year}</small>
                </div>

                <div className="event-card__visual">
                  <div className="event-card__visual-overlay">
                    <span>{event.type}</span>
                  </div>

                  <div className="event-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="event-card__content">

                  <div className="event-card__status">
                    <span
                      className={
                        event.status === "upcoming"
                          ? "status-dot upcoming"
                          : "status-dot completed"
                      }
                    />

                    {event.status === "upcoming"
                      ? "UPCOMING"
                      : "COMPLETED"}
                  </div>

                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <div className="event-card__meta">

                    <span>
                      <MapPin size={15} />
                      {event.location}
                    </span>

                    <span>
                      <CalendarDays size={15} />
                      {event.date} {event.month} {event.year}
                    </span>

                  </div>

                  <Link
                    to={`/event/${event.slug}`}
                    className="event-card__link"
                  >
                    VIEW EVENT
                    <ArrowUpRight size={18} />
                  </Link>

                </div>

              </motion.article>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}

export default Events;