import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">

      {/* Cinematic Background */}
      <div className="hero-background">
        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>
        <div className="hero-grid"></div>
        <div className="hero-noise"></div>
      </div>

      {/* Decorative vertical line */}
      <div className="hero-side-line"></div>

      <div className="hero-container">

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >

          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span></span>
            EVENT MANAGEMENT & EXPERIENCES
          </motion.div>

          <h1>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              WE CREATE
            </motion.span>

            <motion.span
              className="hero-highlight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              EXPERIENCES.
            </motion.span>
          </h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            From meaningful corporate gatherings to unforgettable
            celebrations, we turn ideas into experiences that people
            remember.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <a href="#events" className="hero-primary-btn">
              Explore Events
              <ArrowUpRight size={17} />
            </a>

            <a href="#contact" className="hero-secondary-btn">
              Start a Conversation
            </a>
          </motion.div>

        </motion.div>

        {/* Hero visual information */}
        <motion.div
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <span>CREATIVE</span>
          <span>STRATEGY</span>
          <span>EXPERIENCE</span>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={17} />
        </motion.div>
      </motion.a>

    </section>
  );
}

export default Hero;