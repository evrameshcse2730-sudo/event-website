import { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { db } from "../firebase/config";
import "./GalleryPreview.css";

function GalleryPreview() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(
          collection(db, "gallery"),
          where("status", "==", "published")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;

          return bTime - aTime;
        });

        setGallery(data);
      } catch (error) {
        console.error("Gallery Preview Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const card = carouselRef.current.querySelector(
      ".gallery-carousel-item"
    );

    if (!card) return;

    const cardWidth = card.offsetWidth + 16;

    carouselRef.current.scrollBy({
      left:
        direction === "next"
          ? cardWidth
          : -cardWidth,
      behavior: "smooth",
    });
  };

  /*
    Cloudinary optimization.

    c_fill  = fills the card
    g_auto  = detects important subject
    w/h     = optimized dimensions
    q_auto  = automatic quality
    f_auto  = automatic image format
  */
  const getGalleryImage = (url) => {
    if (!url) return "";

    if (!url.includes("res.cloudinary.com")) {
      return url;
    }

    if (!url.includes("/upload/")) {
      return url;
    }

    const parts = url.split("/upload/");

    return `${parts[0]}/upload/c_fill,g_auto,w_1200,h_800,q_auto,f_auto/${parts[1]}`;
  };

  return (
    <section className="gallery-preview section">
      <div className="container">

        {/* HEADER */}

        <div className="gallery-preview-header">

          <div>
            <span className="section-label">
              OUR WORK
            </span>

            <h2 className="section-title">
              MOMENTS
              <br />
              THAT MATTER.
            </h2>
          </div>

          <div className="gallery-preview-actions">

            <Link
              to="/gallery"
              className="gallery-view-all"
            >
              <span>View Full Gallery</span>
              <ArrowUpRight size={17} />
            </Link>

            {!loading && gallery.length > 1 && (
              <div className="gallery-carousel-controls">

                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel("prev")
                  }
                  aria-label="Previous gallery image"
                >
                  <ArrowLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel("next")
                  }
                  aria-label="Next gallery image"
                >
                  <ArrowRight size={18} />
                </button>

              </div>
            )}

          </div>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="gallery-preview-loading">
            Loading gallery...
          </div>
        )}

        {/* EMPTY */}

        {!loading && gallery.length === 0 && (
          <div className="gallery-preview-empty">
            <h3>No gallery images yet.</h3>

            <p>
              Published event moments will appear here.
            </p>
          </div>
        )}

        {/* CAROUSEL */}

        {!loading && gallery.length > 0 && (
          <div
            className="gallery-carousel"
            ref={carouselRef}
          >

            {gallery.map((item) => (
              <Link
                to="/gallery"
                className="gallery-carousel-item"
                key={item.id}
              >

                <div className="gallery-carousel-image">

                  {item.imageUrl ? (
                    <img
                      src={getGalleryImage(item.imageUrl)}
                      alt={
                        item.title ||
                        "Event gallery image"
                      }
                      loading="lazy"
                    />
                  ) : (
                    <div className="gallery-preview-placeholder">
                      No Image
                    </div>
                  )}

                  <div className="gallery-carousel-overlay">

                    <div className="gallery-carousel-content">

                      {item.category && (
                        <span className="gallery-preview-category">
                          {item.category}
                        </span>
                      )}

                      <h3>
                        {item.title ||
                          "Event Moment"}
                      </h3>

                    </div>

                    <span className="gallery-preview-arrow">
                      <ArrowUpRight size={18} />
                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default GalleryPreview;