import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import "./Gallery.css";

const galleryItems = [
  {
    id: 1,
    title: "Corporate Experience",
    category: "Corporate",
    size: "large",
  },
  {
    id: 2,
    title: "Wedding Celebration",
    category: "Wedding",
    size: "small",
  },
  {
    id: 3,
    title: "Brand Launch",
    category: "Product Launch",
    size: "small",
  },
  {
    id: 4,
    title: "Annual Conference",
    category: "Conference",
    size: "large",
  },
  {
    id: 5,
    title: "Cultural Evening",
    category: "Cultural",
    size: "small",
  },
  {
    id: 6,
    title: "Leadership Summit",
    category: "Corporate",
    size: "small",
  },
];

function Gallery() {
  return (
    <div className="gallery-page">

      <section className="gallery-page__hero">
        <div className="container">

          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            OUR WORK
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            MOMENTS
            <br />
            <span>THAT MATTER.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A collection of experiences, celebrations and moments
            we have helped bring to life.
          </motion.p>

        </div>
      </section>

      <section className="gallery-page__content section">
        <div className="container">

          <div className="gallery-page__grid">

            {galleryItems.map((item, index) => (
              <motion.article
                key={item.id}
                className={`gallery-page__item gallery-page__item--${item.size}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
              >
                <div className="gallery-page__visual">
                  <div className="gallery-page__placeholder">
                    <span>EVENT IMAGE</span>
                  </div>

                  <div className="gallery-page__overlay">
                    <span>{item.category}</span>

                    <div className="gallery-page__info">
                      <h2>{item.title}</h2>

                      <span className="gallery-page__arrow">
                        <ArrowUpRight size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}

export default Gallery;