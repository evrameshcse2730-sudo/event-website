import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./GalleryPreview.css";

const galleryItems = [
  {
    id: 1,
    title: "Corporate Experience",
    category: "Corporate",
    size: "tall",
  },
  {
    id: 2,
    title: "Wedding Celebration",
    category: "Wedding",
    size: "wide",
  },
  {
    id: 3,
    title: "Brand Launch",
    category: "Product Launch",
    size: "normal",
  },
  {
    id: 4,
    title: "Annual Conference",
    category: "Conference",
    size: "normal",
  },
  {
    id: 5,
    title: "Cultural Evening",
    category: "Cultural",
    size: "wide",
  },
];

function GalleryPreview() {
  return (
    <section className="gallery-preview">
      <div className="container">
        <div className="gallery-preview__header">
          <motion.div
            className="gallery-preview__label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            THE GALLERY
          </motion.div>

          <div className="gallery-preview__heading">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              MOMENTS THAT
              <br />
              <span>STAY WITH YOU.</span>
            </motion.h2>

            <motion.a
              href="/gallery"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              VIEW FULL GALLERY
              <ArrowUpRight size={17} />
            </motion.a>
          </div>
        </div>

        <div className="gallery-preview__grid">
          {galleryItems.map((item, index) => (
            <motion.a
              href="/gallery"
              key={item.id}
              className={`gallery-item gallery-item--${item.size}`}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
            >
              <div className="gallery-item__visual">
                <div className="gallery-item__placeholder">
                  <span>GALLERY IMAGE</span>
                </div>

                <div className="gallery-item__overlay"></div>

                <div className="gallery-item__info">
                  <div>
                    <span>{item.category}</span>
                    <h3>{item.title}</h3>
                  </div>

                  <div className="gallery-item__arrow">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryPreview;