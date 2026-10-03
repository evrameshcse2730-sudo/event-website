import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "./EventTypeDetails.css";

const eventTypeData = {
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

function EventTypeDetails() {
  const { slug } = useParams();

  const event = eventTypeData[slug] || eventTypeData["corporate-events"];

  return (
    <main className="event-type-details">

      {/* Hero */}

      <section className="event-type-details__hero">
        <div className="container">

          <Link
            to="/event-types"
            className="event-type-details__back"
          >
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
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
          >
            {event.description}
          </motion.p>

        </div>
      </section>

      {/* Introduction */}

      <section className="event-type-details__intro">
        <div className="container">

          <div className="event-type-details__intro-grid">

            <span className="section-label">
              THE EXPERIENCE
            </span>

            <div>
              <h2>
                DESIGNED AROUND
                <br />
                YOUR <span>VISION.</span>
              </h2>

              <p>{event.intro}</p>

              <Link
                to="/contact"
                className="event-type-details__cta"
              >
                PLAN THIS EVENT
                <ArrowUpRight size={18} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Visual */}

      <section className="event-type-details__visual-section">
        <div className="container">

          <div className="event-type-details__visual">
            <span>EVENT EXPERIENCE IMAGE / VIDEO</span>
          </div>

        </div>
      </section>

      {/* Services */}

      <section className="event-type-details__services">
        <div className="container">

          <div className="event-type-details__services-head">
            <span className="section-label">
              WHAT WE HANDLE
            </span>

            <h2>
              EVERYTHING
              <br />
              <span>CONNECTED.</span>
            </h2>
          </div>

          <div className="event-type-details__service-list">
            {event.services.map((service, index) => (
              <div
                className="event-type-details__service"
                key={service}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{service}</h3>

                <Check size={18} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}

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