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
    description: "Conferences, business gatherings, leadership meets and professional experiences.",
    className: "event-card-large",
    slug: "corporate-events",
  },
  {
    id: "weddings",
    number: "02",
    title: "Weddings & Celebrations",
    description: "Thoughtfully planned celebrations designed around your story and special moments.",
    className: "event-card-tall",
    slug: "weddings",
  },
  {
    id: "conferences",
    number: "03",
    title: "Conferences & Summits",
    description: "Large-scale gatherings created for meaningful conversations and connections.",
    className: "event-card-small",
    slug: "conferences",
  },
  {
    id: "product-launches",
    number: "04",
    title: "Product Launches",
    description: "Launch experiences designed to create attention, energy and lasting impressions.",
    className: "event-card-small",
    slug: "product-launches",
  },
  {
    id: "cultural-events",
    number: "05",
    title: "Cultural Events",
    description: "Celebrations that bring culture, creativity and people together.",
    className: "event-card-wide",
    slug: "cultural-events",
  },
];

function EventTypes() {
  const [eventTypes, setEventTypes] = useState(fallbackEventTypes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadEventTypes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "eventTypes"));
        const firebaseEventTypes = snapshot.docs
          .map((document) => ({ id: document.id, ...document.data() }))
          .filter((event) => event.status === "published")
          .sort((a, b) => (a.createdAt?.toMillis?.() ?? 0) - (b.createdAt?.toMillis?.() ?? 0))
          .map((data, index) => {
            const generatedSlug =
              data.title?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "";

            return {
              id: data.id,
              number: String(index + 1).padStart(2, "0"),
              title: data.title || "Untitled Event Type",
              description: data.description || "",
              slug: data.slug || generatedSlug,
              imageUrl: data.imageUrl || data.image || data.coverImage || "",
              className:
                index === 0
                  ? "event-card-large"
                  : index === 1
                  ? "event-card-tall"
                  : index === 2 || index === 3
                  ? "event-card-small"
                  : "event-card-wide",
            };
          });

        if (isMounted) setEventTypes(firebaseEventTypes);
      } catch (error) {
        console.error("Error loading event types from Firebase:", error);
        if (isMounted) setEventTypes(fallbackEventTypes);
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
            From corporate gatherings to unforgettable celebrations, we create experiences that bring
            people, brands and ideas together.
          </p>
        </motion.div>

        <div className="event-types-grid">
          {loading ? (
            <div className="event-types-message">Loading event types...</div>
          ) : eventTypes.length === 0 ? (
            <div className="event-types-message">No published event types available.</div>
          ) : (
            eventTypes.map((event, index) => (
              <motion.a
                href={`/events/${event.slug}`}
                className={`event-type-card ${event.className}`}
                key={event.id}
                style={event.imageUrl ? { "--event-type-image": `url("${event.imageUrl}")` } : undefined}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className={`event-card-bg${event.imageUrl ? " has-image" : ""}`} />
                <div className="event-card-content">
                  <div className="event-card-top">
                    <span>{event.number}</span>
                    <div className="event-card-arrow"><ArrowUpRight size={18} /></div>
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
