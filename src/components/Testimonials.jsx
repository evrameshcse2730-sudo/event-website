import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";
import "./Testimonials.css";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          where("status", "==", "published")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setTestimonials(data);
      } catch (error) {
        console.error(
          "Error loading testimonials:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;

    setActiveIndex((current) =>
      current === testimonials.length - 1
        ? 0
        : current + 1
    );
  };

  const previousTestimonial = () => {
    if (testimonials.length === 0) return;

    setActiveIndex((current) =>
      current === 0
        ? testimonials.length - 1
        : current - 1
    );
  };

  if (loading) {
    return (
      <section className="section testimonials-section">
        <div className="container">
          <div className="testimonial-loading">
            Loading testimonials...
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const testimonial = testimonials[activeIndex];

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="testimonials-heading">
          <span className="section-label">
            Client Stories
          </span>

          <h2 className="section-title">
            TRUSTED BY
            <br />
            PEOPLE.
          </h2>
        </div>

        <div className="testimonial-main">
          <div className="testimonial-quote-mark">
            “
          </div>

          <blockquote>
            {testimonial.quote}
          </blockquote>

          <div className="testimonial-client-info">
            {testimonial.imageUrl ? (
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="testimonial-client-image"
              />
            ) : (
              <div className="testimonial-client-placeholder">
                {testimonial.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>
            )}

            <div>
              <h3>{testimonial.name}</h3>

              {(testimonial.designation ||
                testimonial.company) && (
                <p>
                  {testimonial.designation}

                  {testimonial.designation &&
                    testimonial.company &&
                    " • "}

                  {testimonial.company}
                </p>
              )}
            </div>
          </div>

          {testimonials.length > 1 && (
            <div className="testimonial-controls">
              <button
                type="button"
                onClick={previousTestimonial}
                aria-label="Previous testimonial"
              >
                ←
              </button>

              <span>
                {String(activeIndex + 1).padStart(
                  2,
                  "0"
                )}
                {" / "}
                {String(testimonials.length).padStart(
                  2,
                  "0"
                )}
              </span>

              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;