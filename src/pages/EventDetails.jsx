import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import "./EventDetails.css";

const eventData = {
  "business-summit-2026": {
    title: "Business Summit 2026",
    type: "Corporate Event",
    date: "18 October 2026",
    location: "Hyderabad, Telangana",
    status: "UPCOMING",
    description:
      "A premium gathering bringing business leaders, ideas and meaningful conversations together.",
    intro:
      "Business Summit 2026 is designed as an immersive experience where business leaders, professionals and innovators come together to exchange ideas, build relationships and create meaningful opportunities.",
    highlights: [
      "Executive networking",
      "Leadership conversations",
      "Industry presentations",
      "Premium guest experience",
    ],
  },

  "wedding-celebration": {
    title: "Wedding Celebration",
    type: "Wedding",
    date: "25 October 2026",
    location: "Vijayawada, Andhra Pradesh",
    status: "UPCOMING",
    description:
      "A beautifully planned celebration designed around people, emotions and unforgettable moments.",
    intro:
      "Every wedding has its own story. This celebration is carefully planned around the couple, their families and the moments they want to remember forever.",
    highlights: [
      "Venue styling",
      "Guest management",
      "Creative decor",
      "Complete event coordination",
    ],
  },

  "brand-launch-experience": {
    title: "Brand Launch Experience",
    type: "Product Launch",
    date: "08 November 2026",
    location: "Bengaluru, Karnataka",
    status: "UPCOMING",
    description:
      "A creative launch experience designed to introduce a brand with energy and impact.",
    intro:
      "From the first reveal to the final interaction, every detail of the launch is designed to create attention, engagement and a memorable brand experience.",
    highlights: [
      "Launch strategy",
      "Stage and set design",
      "Guest experience",
      "Brand activation",
    ],
  },

  "leadership-summit-2025": {
    title: "Leadership Summit",
    type: "Conference",
    date: "14 December 2025",
    location: "Hyderabad, Telangana",
    status: "COMPLETED",
    description:
      "A high-energy leadership gathering focused on ideas, collaboration and meaningful connections.",
    intro:
      "The Leadership Summit brought together professionals and business leaders for a day of conversations, presentations and meaningful networking.",
    highlights: [
      "Leadership sessions",
      "Speaker management",
      "Networking experience",
      "Event production",
    ],
  },
};

function EventDetails() {
  const { slug } = useParams();

  const event = eventData[slug];

  if (!event) {
    return (
      <main className="event-details-not-found">
        <div className="container">
          <span className="section-label">EVENT NOT FOUND</span>

          <h1>THIS EVENT DOESN’T EXIST.</h1>

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

        <div className="event-details__hero-bg" />

        <div className="container">

          <Link
            to="/events"
            className="event-details__back"
          >
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

            <span className="section-label">
              {event.type}
            </span>

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

              <span className="section-label">
                THE EXPERIENCE
              </span>

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
                <div className="event-details__meta-number">
                  01
                </div>

                <div>
                  <span>EVENT TYPE</span>
                  <strong>{event.type}</strong>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* VISUAL */}

      <section className="event-details__visual">

        <div className="container">

          <div className="event-details__visual-box">

            <div className="event-details__visual-number">
              EVENT EXPERIENCE
            </div>

            <div className="event-details__visual-title">
              {event.title}
            </div>

          </div>

        </div>

      </section>

      {/* HIGHLIGHTS */}

      <section className="event-details__highlights section">

        <div className="container">

          <div className="event-details__highlights-header">

            <div>
              <span className="section-label">
                EVENT DETAILS
              </span>

              <h2 className="section-title">
                WHAT WE
                <br />
                <span>CREATE.</span>
              </h2>
            </div>

            <p>
              Every element is planned with purpose,
              from the first idea to the final guest
              experience.
            </p>

          </div>

          <div className="event-details__highlight-list">

            {event.highlights.map((item, index) => (
              <motion.div
                className="event-highlight"
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

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

          <span className="section-label">
            PLAN YOUR EXPERIENCE
          </span>

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