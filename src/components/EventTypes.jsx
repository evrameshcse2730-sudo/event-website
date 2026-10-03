import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./EventTypes.css";

const eventTypes = [
  {
    number: "01",
    title: "Corporate Events",
    description:
      "Conferences, business gatherings, leadership meets and professional experiences.",
    className: "event-card-large",
  },
  {
    number: "02",
    title: "Weddings & Celebrations",
    description:
      "Thoughtfully planned celebrations designed around your story and special moments.",
    className: "event-card-tall",
  },
  {
    number: "03",
    title: "Conferences & Summits",
    description:
      "Large-scale gatherings created for meaningful conversations and connections.",
    className: "event-card-small",
  },
  {
    number: "04",
    title: "Product Launches",
    description:
      "Launch experiences designed to create attention, energy and lasting impressions.",
    className: "event-card-small",
  },
  {
    number: "05",
    title: "Cultural Events",
    description:
      "Celebrations that bring culture, creativity and people together.",
    className: "event-card-wide",
  },
];

function EventTypes() {
  return (
    <section className="event-types" id="events">
      <div className="event-types-container">

        {/* Header */}
        <motion.div
          className="event-types-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="event-types-label">
            <span>02</span>
            <i></i>
            WHAT WE DO
          </div>

          <h2>
            EVENTS,
            <br />
            <span>DESIGNED</span>
            <br />
            AROUND
            <br />
            EXPERIENCE.
          </h2>

          <p>
            From corporate gatherings to unforgettable celebrations,
            we create experiences that bring people, brands and ideas
            together.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="event-types-grid">
          {eventTypes.map((event, index) => (
            <motion.a
              href={`/events/${event.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")}`}
              className={`event-type-card ${event.className}`}
              key={event.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
            >
              <div className="event-card-bg"></div>

              <div className="event-card-content">
                <div className="event-card-top">
                  <span>{event.number}</span>

                  <div className="event-card-arrow">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div>
                  <h3>{event.title}</h3>

                  <p>{event.description}</p>
                </div>

                <div className="event-card-bottom">
                  <span>EXPLORE</span>
                  <span className="event-card-line"></span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default EventTypes;