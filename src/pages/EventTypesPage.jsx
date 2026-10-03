import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./EventTypesPage.css";

const eventTypes = [
  {
    number: "01",
    title: "Corporate Events",
    slug: "corporate-events",
    description:
      "Professional experiences designed for conferences, meetings, summits, annual events and corporate gatherings.",
  },
  {
    number: "02",
    title: "Weddings & Celebrations",
    slug: "weddings",
    description:
      "Beautifully planned celebrations designed around emotions, people, traditions and unforgettable moments.",
  },
  {
    number: "03",
    title: "Conferences & Summits",
    slug: "conferences",
    description:
      "Engaging environments for knowledge sharing, networking, leadership and meaningful conversations.",
  },
  {
    number: "04",
    title: "Product Launches",
    slug: "product-launches",
    description:
      "Creative launch experiences designed to introduce products and brands with energy and impact.",
  },
  {
    number: "05",
    title: "Cultural Events",
    slug: "cultural-events",
    description:
      "Immersive cultural experiences that bring together creativity, tradition, entertainment and community.",
  },
];

function EventTypesPage() {
  return (
    <main className="event-types-page">

      <section className="event-types-page__hero">
        <div className="container">
          <motion.span
            className="event-types-page__label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            WHAT WE DO
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            EVENTS BUILT
            <br />
            AROUND <span>EXPERIENCE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            From business gatherings to personal celebrations, we create
            experiences designed around the people, purpose and atmosphere
            behind every event.
          </motion.p>
        </div>
      </section>

      <section className="event-types-page__list">
        <div className="container">

          {eventTypes.map((event, index) => (
            <motion.a
              href={`/events/${event.slug}`}
              className="event-types-page__item"
              key={event.slug}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
            >
              <span className="event-types-page__number">
                {event.number}
              </span>

              <div className="event-types-page__visual">
                <span>EVENT IMAGE</span>
              </div>

              <div className="event-types-page__content">
                <h2>{event.title}</h2>

                <p>{event.description}</p>

                <span className="event-types-page__link">
                  EXPLORE EVENT
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </motion.a>
          ))}

        </div>
      </section>

    </main>
  );
}

export default EventTypesPage;