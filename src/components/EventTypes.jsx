
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import "./EventTypes.css";

const fallbackEventTypes = [
  {
    id: "corporate-events",
    number: "01",
    title: "Corporate Events",
    description:
      "Conferences, business gatherings, leadership meets and professional experiences.",
    className: "event-card-large",
    slug: "corporate-events",
    imageUrl: "",
  },
  {
    id: "weddings",
    number: "02",
    title: "Weddings & Celebrations",
    description:
      "Thoughtfully planned celebrations designed around your story and special moments.",
    className: "event-card-tall",
    slug: "weddings",
    imageUrl: "",
  },
  {
    id: "conferences",
    number: "03",
    title: "Conferences & Summits",
    description:
      "Large-scale gatherings created for meaningful conversations and connections.",
    className: "event-card-small",
    slug: "conferences",
    imageUrl: "",
  },
  {
    id: "product-launches",
    number: "04",
    title: "Product Launches",
    description:
      "Launch experiences designed to create attention, energy and lasting impressions.",
    className: "event-card-small",
    slug: "product-launches",
    imageUrl: "",
  },
  {
    id: "cultural-events",
    number: "05",
    title: "Cultural Events",
    description:
      "Celebrations that bring culture, creativity and people together.",
    className: "event-card-wide",
    slug: "cultural-events",
    imageUrl: "",
  },
];

const getImageUrl = (data) => {
  const value =
    data.imageUrl ||
    data.imageURL ||
    data.image ||
    data.coverImage ||
    "";

  return typeof value === "string" ? value.trim() : "";
};

const getSlug = (data) => {
  return (
    data.slug ||
    data.title
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") ||
    ""
  );
};

const getCardClass = (index) => {
  if (index === 0) return "event-card-large";
  if (index === 1) return "event-card-tall";
  if (index === 2 || index === 3) return "event-card-small";
  return "event-card-wide";
};

function EventTypes() {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadEventTypes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "eventTypes"));

        const publishedTypes = snapshot.docs
          .map((document) => ({
            id: document.id,
            ...document.data(),
          }))
          .filter(
            (event) =>
              String(event.status || "").toLowerCase() === "published"
          )
          .sort(
            (a, b) =>
              (a.createdAt?.toMillis?.() ?? 0) -
              (b.createdAt?.toMillis?.() ?? 0)
          )
          .map((data, index) => ({
            id: data.id,
            number: String(index + 1).padStart(2, "0"),
            title: data.title || "Untitled Event Type",
            description: data.description || "",
            slug: getSlug(data),
            imageUrl: getImageUrl(data),
            className: getCardClass(index),
          }));

        if (isMounted) {
          setEventTypes(publishedTypes);
          setLoadError(false);
        }
      } catch (error) {
        console.error("Failed to load event types:", error);

        if (isMounted) {
          setEventTypes([]);
          setLoadError(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadEventTypes();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="event-types" id="events">
      <div className="event-types-container">
        <motion.div
          className="event-types-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="event-types-label">
            <span>02</span>
            <i />
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
            From corporate gatherings to unforgettable celebrations, we create
            experiences that bring people, brands and ideas together.
          </p>
        </motion.div>

        <div className="event-types-grid">
          {loading ? (
            <div className="event-types-message">
              Loading event types...
            </div>
          ) : eventTypes.length === 0 ? (
            <div className="event-types-message">
              {loadError
                ? "Unable to load event types. Please try again later."
                : "No published event types available."}
            </div>
          ) : (
            eventTypes.map((event, index) => (
              <motion.a
                href={`/events/${event.slug}`}
                className={`event-type-card ${event.className}`}
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div
                  className={`event-card-bg${
                    event.imageUrl ? " has-image" : ""
                  }`}
                  style={
                    event.imageUrl
                      ? {
                          backgroundImage: `linear-gradient(
                            180deg,
                            rgba(5, 16, 15, 0.05) 10%,
                            rgba(5, 16, 15, 0.82) 100%
                          ), url("${event.imageUrl}")`,
                        }
                      : undefined
                  }
                />

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
                    <span className="event-card-line" />
                  </div>
                </div>
              </motion.a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default EventTypes;
