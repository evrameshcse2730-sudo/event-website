
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import "./EventTypesPage.css";

const fallbackEventTypes = [
  {
    id: "corporate-events",
    number: "01",
    title: "Corporate Events",
    slug: "corporate-events",
    description:
      "Professional experiences designed for conferences, meetings, summits, annual events and corporate gatherings.",
    imageUrl: "",
  },
  {
    id: "weddings",
    number: "02",
    title: "Weddings & Celebrations",
    slug: "weddings",
    description:
      "Beautifully planned celebrations designed around emotions, people, traditions and unforgettable moments.",
    imageUrl: "",
  },
  {
    id: "conferences",
    number: "03",
    title: "Conferences & Summits",
    slug: "conferences",
    description:
      "Engaging environments for knowledge sharing, networking, leadership and meaningful conversations.",
    imageUrl: "",
  },
  {
    id: "product-launches",
    number: "04",
    title: "Product Launches",
    slug: "product-launches",
    description:
      "Creative launch experiences designed to introduce products and brands with energy and impact.",
    imageUrl: "",
  },
  {
    id: "cultural-events",
    number: "05",
    title: "Cultural Events",
    slug: "cultural-events",
    description:
      "Immersive cultural experiences that bring together creativity, tradition, entertainment and community.",
    imageUrl: "",
  },
];

function getImageUrl(data) {
  const value =
    data.imageUrl ||
    data.imageURL ||
    data.image ||
    data.coverImage ||
    "";

  return typeof value === "string" ? value.trim() : "";
}

function makeSlug(title = "") {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function EventTypesPage() {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadEventTypes() {
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
            slug: data.slug || makeSlug(data.title),
            description: data.description || "",
            imageUrl: getImageUrl(data),
          }));

        if (active) {
          setEventTypes(
            publishedTypes.length > 0 ? publishedTypes : []
          );
        }
      } catch (err) {
        console.error("Error loading event types:", err);

        if (active) {
          setError(true);
          setEventTypes([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadEventTypes();

    return () => {
      active = false;
    };
  }, []);

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
          {loading ? (
            <p className="event-types-page__message">
              Loading event types...
            </p>
          ) : error ? (
            <p className="event-types-page__message">
              Unable to load event types. Please try again later.
            </p>
          ) : eventTypes.length === 0 ? (
            <p className="event-types-page__message">
              No published event types available.
            </p>
          ) : (
            eventTypes.map((event, index) => (
              <motion.a
                href={`/events/${event.slug}`}
                className="event-types-page__item"
                key={event.id}
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

                <div
                  className="event-types-page__visual"
                  style={
                    event.imageUrl
                      ? {
                          backgroundImage: `linear-gradient(
                            180deg,
                            rgba(5, 16, 15, 0.05),
                            rgba(5, 16, 15, 0.35)
                          ), url("${event.imageUrl}")`,
                        }
                      : undefined
                  }
                >
                  {!event.imageUrl && (
                    <span>IMAGE NOT AVAILABLE</span>
                  )}
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
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default EventTypesPage;
