import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./AboutPreview.css";

const stats = [
  { number: "150+", label: "Events Created" },
  { number: "80+", label: "Happy Clients" },
  { number: "12", label: "Cities Reached" },
];

function AboutPreview() {
  return (
    <section className="about-preview" id="about">
      <div className="about-container">

        {/* Top label */}
        <motion.div
          className="about-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="about-number">01</span>

          <span className="about-label">
            ABOUT THE EXPERIENCE
          </span>

          <span className="about-line"></span>
        </motion.div>

        {/* Main content */}
        <div className="about-main">

          {/* Heading */}
          <motion.div
            className="about-heading-wrap"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9 }}
          >
            <h2>
              WE DON'T JUST
              <br />
              <span>ORGANIZE EVENTS.</span>
            </h2>

            <div className="about-highlight">
              <span></span>
              WE CREATE EXPERIENCES.
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            className="about-description"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p>
              Every event begins with an idea. We transform that idea
              into a thoughtfully planned experience where creativity,
              people and details come together.
            </p>

            <p>
              From corporate gatherings and conferences to celebrations
              and special occasions, we bring planning, production and
              execution together under one roof.
            </p>

            <a href="/about" className="about-link">
              Discover Our Story
              <ArrowUpRight size={17} />
            </a>
          </motion.div>
        </div>

        {/* Visual section */}
        <div className="about-visual">

          <motion.div
            className="about-image-frame"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="about-image-placeholder">
              <span>EVENT</span>
              <strong>EXPERIENCE</strong>
              <small>IMAGE / VIDEO</small>
            </div>

            <div className="about-image-overlay"></div>
          </motion.div>

          <div className="about-image-caption">
            <span>CREATING MOMENTS</span>
            <span>01 / 04</span>
          </div>

        </div>

        {/* Statistics */}
        <div className="about-stats">
          {stats.map((stat, index) => (
            <motion.div
              className="stat"
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
            >
              <span className="stat-number">
                {stat.number}
              </span>

              <span className="stat-label">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutPreview;