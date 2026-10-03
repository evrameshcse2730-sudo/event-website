import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./PastEvents.css";

const pastEvents = [
  {
    id: 1,
    title: "Leadership Summit",
    category: "Corporate",
    location: "Hyderabad",
    year: "2026",
    size: "large",
  },
  {
    id: 2,
    title: "Wedding Celebration",
    category: "Wedding",
    location: "Vijayawada",
    year: "2026",
    size: "small",
  },
  {
    id: 3,
    title: "Brand Experience",
    category: "Product Launch",
    location: "Bengaluru",
    year: "2025",
    size: "small",
  },
  {
    id: 4,
    title: "Cultural Festival",
    category: "Cultural",
    location: "Hyderabad",
    year: "2025",
    size: "large",
  },
];

function PastEvents() {
  return (
    <section className="past-events">
      <div className="container">
        <div className="past-events__header">
          <motion.div
            className="past-events__label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            OUR WORK
          </motion.div>

          <div className="past-events__heading">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              EXPERIENCES
              <br />
              WE'VE <span>CREATED.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              From intimate celebrations to large-scale experiences, every
              event tells a different story.
            </motion.p>
          </div>
        </div>

        <div className="past-events__grid">
          {pastEvents.map((event, index) => (
            <motion.a
              href={`/events/${event.id}`}
              className={`past-event-card past-event-card--${event.size}`}
              key={event.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
              }}
            >
              <div className="past-event-card__visual">
                <div className="past-event-card__placeholder">
                  <span>EVENT IMAGE</span>
                </div>

                <div className="past-event-card__overlay"></div>

                <div className="past-event-card__top">
                  <span>{event.category}</span>

                  <div className="past-event-card__arrow">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <div className="past-event-card__bottom">
                  <div>
                    <h3>{event.title}</h3>

                    <p>
                      {event.location} · {event.year}
                    </p>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="past-events__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <a href="/events">
            VIEW ALL EVENTS
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default PastEvents;