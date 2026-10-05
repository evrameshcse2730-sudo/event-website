import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import "./Gallery.css";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const galleryRef = collection(db, "gallery");

        const q = query(
          galleryRef,
          where("status", "==", "published")
        );

        const snapshot = await getDocs(q);

        const galleryData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Gallery Data:", galleryData);

        setGallery(galleryData);
      } catch (error) {
        console.error("Gallery Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Categories
  const categories = [
    "All",
    ...new Set(
      gallery
        .map((item) => item.category)
        .filter((category) => category)
    ),
  ];

  // Filter gallery
  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter(
          (item) => item.category === activeCategory
        );

  return (
    <main className="gallery-page">

      {/* HERO */}
      <section className="gallery-hero section">
        <div className="container">
          <span className="section-label">
            OUR WORK
          </span>

          <h1 className="section-title">
            MOMENTS
            <br />
            THAT MATTER.
          </h1>

          <p className="gallery-intro">
            A collection of experiences, celebrations and
            moments brought to life through thoughtful event
            experiences.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-content section">
        <div className="container">

          {/* LOADING */}
          {loading && (
            <div className="gallery-loading">
              <p>Loading gallery...</p>
            </div>
          )}

          {/* EMPTY */}
          {!loading && gallery.length === 0 && (
            <div className="gallery-empty">
              <h2>No gallery images yet.</h2>

              <p>
                New event moments will appear here soon.
              </p>
            </div>
          )}

          {/* GALLERY DATA */}
          {!loading && gallery.length > 0 && (
            <>
              {/* FILTERS */}
              <div className="gallery-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      activeCategory === category
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveCategory(category)
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* GRID */}
              {filteredGallery.length > 0 ? (
                <div className="gallery-grid">

                  {filteredGallery.map((item) => (
                    <article
                      className="gallery-item"
                      key={item.id}
                    >
                      <div className="gallery-image-wrap">

                        {/* IMAGE */}
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={
                              item.title ||
                              "Event gallery image"
                            }
                            loading="lazy"
                          />
                        ) : (
                          <div className="gallery-image-placeholder">
                            No Image
                          </div>
                        )}

                        {/* OVERLAY */}
                        <div className="gallery-overlay">

                          {item.category && (
                            <span>
                              {item.category}
                            </span>
                          )}

                          <h3>
                            {item.title ||
                              "Event Moment"}
                          </h3>

                          {item.event && (
                            <p>
                              {item.event}
                            </p>
                          )}

                        </div>

                      </div>
                    </article>
                  ))}

                </div>
              ) : (
                <div className="gallery-empty">
                  <h2>
                    No images in this category.
                  </h2>

                  <p>
                    Try selecting another category.
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      </section>

    </main>
  );
}

export default Gallery;