import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { db } from "../firebase/config";
import "./GalleryPreview.css";

function GalleryPreview() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadGallery = async () => {
      try {
        const galleryQuery = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(galleryQuery);

        const items = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (item) => item.status === "published" && item.imageUrl
          )
          .slice(0, 10);

        if (mounted) {
          setGalleryItems(items);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error("Error loading completed event gallery:", error);
        if (mounted) setGalleryItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadGallery();

    return () => {
      mounted = false;
    };
  }, []);

  const count = galleryItems.length;

  const visibleCards = useMemo(() => {
    if (!count) return [];

    return [-2, -1, 0, 1, 2]
      .map((offset) => {
        const index = (activeIndex + offset + count) % count;

        return {
          item: galleryItems[index],
          index,
          offset,
        };
      })
      .filter(
        (card, position, cards) =>
          cards.findIndex(
            (candidate) => candidate.index === card.index
          ) === position
      );
  }, [galleryItems, activeIndex, count]);

  const move = (direction) => {
    if (!count) return;

    setActiveIndex(
      (current) => (current + direction + count) % count
    );
  };

  const openGallery = () => {
    window.location.href = "/gallery";
  };

  const offsetClass = (offset) => {
    if (offset === -2) return "offset-m2";
    if (offset === -1) return "offset-m1";
    if (offset === 1) return "offset-p1";
    if (offset === 2) return "offset-p2";
    return "offset-center";
  };

  return (
    <section className="completed-events" id="gallery">
      <div className="completed-events__container">
        <header className="completed-events__header">
          <div>
            <span className="completed-events__eyebrow">
              OUR WORK
            </span>

            <h2>
              MOMENTS
              <br />
              THAT <span>MATTER.</span>
            </h2>
          </div>

          <p>
            A glimpse of the celebrations, connections and experiences
            we have brought to life.
          </p>
        </header>

        <div
          className="completed-events__carousel"
          aria-label="Completed events carousel"
        >
          {loading ? (
            <div className="completed-events__state">
              Loading completed events...
            </div>
          ) : count === 0 ? (
            <div className="completed-events__state">
              No published gallery images yet. Add images from Admin
              Panel → Gallery.
            </div>
          ) : (
            <>
              <button
                type="button"
                className="completed-events__arrow completed-events__arrow--left"
                onClick={() => move(-1)}
                aria-label="Previous event"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="completed-events__stage">
                {visibleCards.map(({ item, index, offset }) => (
                  <button
                    type="button"
                    key={item.id}
                    className={[
                      "completed-events__card",
                      `completed-events__card--${offsetClass(offset)}`,
                      offset === 0 ? "is-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(5, 16, 15, .02) 15%, rgba(5, 16, 15, .88) 100%), url("${item.imageUrl}")`,
                    }}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${
                      item.title || item.event || "event image"
                    }`}
                    aria-current={offset === 0 ? "true" : undefined}
                  >
                    <span className="completed-events__card-top">
                      <span className="completed-events__category">
                        {item.category || "EVENT"}
                      </span>

                      <span className="completed-events__card-link">
                        <ArrowUpRight size={17} />
                      </span>
                    </span>

                    <span className="completed-events__card-copy">
                      <span className="completed-events__event-name">
                        {item.title || item.event || "Completed Event"}
                      </span>

                      {item.event && item.event !== item.title && (
                        <span className="completed-events__event-detail">
                          {item.event}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="completed-events__arrow completed-events__arrow--right"
                onClick={() => move(1)}
                aria-label="Next event"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {count > 0 && (
          <div
            className="completed-events__pagination"
            aria-label="Choose event image"
          >
            {galleryItems.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={
                  index === activeIndex ? "is-active" : ""
                }
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={
                  index === activeIndex ? "true" : undefined
                }
              />
            ))}
          </div>
        )}

        <footer className="completed-events__footer">
          <span>CELEBRATING THE MOMENTS THAT MATTER</span>

          <button type="button" onClick={openGallery}>
            Explore All Events <ArrowUpRight size={17} />
          </button>
        </footer>
      </div>
    </section>
  );
}

export default GalleryPreview;
