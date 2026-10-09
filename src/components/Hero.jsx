import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import "./Hero.css";

function Hero() {
  const [content, setContent] = useState({
    heroLabel: "EVENT MANAGEMENT & EXPERIENCES",
    heroTitle: "WE CREATE EXPERIENCES.",
    heroDescription:
      "From meaningful corporate gatherings to unforgettable celebrations, we turn ideas into experiences that people remember.",
    heroButton: "Explore Events",
    heroSecondaryButton: "Start a Conversation",
  });

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const contentRef = doc(
          db,
          "content",
          "website"
        );

        const snapshot = await getDoc(contentRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          if (data.home) {
            setContent((previous) => ({
              ...previous,
              ...data.home,
            }));
          }
        }
      } catch (error) {
        console.error(
          "Error loading hero content:",
          error
        );
      }
    };

    loadHeroContent();
  }, []);

  // Split title into two lines
  const titleParts = content.heroTitle
    .trim()
    .split(" ");

  const highlightText =
    titleParts.length > 1
      ? titleParts.slice(-1).join(" ")
      : content.heroTitle;

  const mainTitle =
    titleParts.length > 1
      ? titleParts.slice(0, -1).join(" ")
      : "";

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
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* Eyebrow */}

          <motion.div
            className="hero-eyebrow"
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
          >
            <span></span>

            {content.heroLabel}

          </motion.div>


          {/* Title */}

          <h1>

            <motion.span
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
            >
              {mainTitle}
            </motion.span>


            <motion.span
              className="hero-highlight"
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.8,
              }}
            >
              {highlightText}
            </motion.span>

          </h1>


          {/* Description */}

          <motion.p
            className="hero-description"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.65,
              duration: 0.7,
            }}
          >
            {content.heroDescription}
          </motion.p>


          {/* Buttons */}

          <motion.div
            className="hero-actions"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
              duration: 0.7,
            }}
          >

            <a
              href="#events"
              className="hero-primary-btn"
            >
              {content.heroButton}

              <ArrowUpRight size={17} />
            </a>


            <a
              href="#contact"
              className="hero-secondary-btn"
            >
              {content.heroSecondaryButton}
            </a>

          </motion.div>

        </motion.div>


        {/* Hero visual information */}

        <motion.div
          className="hero-meta"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.1,
            duration: 1,
          }}
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
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.3,
        }}
      >

        <span>
          SCROLL TO EXPLORE
        </span>

        <motion.div
          animate={{
            y: [0, 7, 0],
          }}
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