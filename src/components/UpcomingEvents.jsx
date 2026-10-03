import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import "./UpcomingEvents.css";

const upcomingEvents = [
  {
    id: 1,
    date: "18",
    month: "OCT",
    year: "2026",
    title: "Business Summit 2026",
    type: "Corporate Event",
    location: "Hyderabad",
    description:
      "A premium gathering bringing business leaders, ideas and meaningful conversations together.",
  },
  {
    id: 2,
    date: "25",
    month: "OCT",
    year: "2026",
    title: "Wedding Celebration",
    type: "Wedding",
    location: "Vijayawada",
    description:
      "A beautifully planned celebration designed around people, emotions and unforgettable moments.",
  },
  {
    id: 3,
    date: "08",
    month: "NOV",
    year: "2026",
    title: "Brand Launch Experience",
    type: "Product Launch",
    location: "Bengaluru",
    description:
      "A creative launch experience designed to introduce a brand with energy and impact.",
  },
];

function UpcomingEvents() {
  return (
    <section className="upcoming-events" id="upcoming">

      <div className="upcoming-container">

        {/* Header */}
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
              <i></i>
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

        {/* Events */}
        <div className="upcoming-list">

          {upcomingEvents.map((event, index) => (
            <motion.article
              className="upcoming-card"
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
            >

              {/* Date */}
              <div className="event-date">
                <span className="event-date-number">
                  {event.date}
                </span>

                <span className="event-date-month">
                  {event.month}
                </span>

                <span className="event-date-year">
                  {event.year}
                </span>
              </div>

              {/* Content */}
              <div className="upcoming-content">

                <span className="upcoming-type">
                  {event.type}
                </span>

                <h3>{event.title}</h3>

                <p>{event.description}</p>

                <div className="event-meta">
                  <span>
                    <CalendarDays size={14} />
                    {event.date} {event.month} {event.year}
                  </span>

                  <span>
                    <MapPin size={14} />
                    {event.location}
                  </span>
                </div>

              </div>

              {/* Action */}
              <a
                href={`/event/${event.id}`}
                className="upcoming-action"
                aria-label={`View ${event.title}`}
              >
                <ArrowUpRight size={21} />
              </a>

            </motion.article>
          ))}

        </div>

        {/* Bottom link */}
        <motion.div
          className="upcoming-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="/events">
            View All Events
            <ArrowUpRight size={17} />
          </a>
        </motion.div>

      </div>

    </section>
  );
}

export default UpcomingEvents;