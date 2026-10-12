
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import "./Hero.css";

function Hero() {
  const [content, setContent] = useState({
    heroLabel: "EVENT MANAGEMENT & EXPERIENCES",
    heroTitle: "WHERE EVERY EVENT BECOMES AN EXPERIENCE.",
    heroDescription:
      "From meaningful corporate gatherings to unforgettable celebrations, we create moments that stay with you.",
    heroButton: "EXPLORE EVENTS",
    heroSecondaryButton: "LET'S TALK",
    introVideoUrl: "",
    introVideoEnabled: true,
  });

  const [heroContentLoaded, setHeroContentLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadHeroContent = async () => {
      try {
        const contentRef = doc(db, "content", "website");
        const snapshot = await getDoc(contentRef);

        if (!mounted) return;

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
        console.error("Error loading hero content:", error);
      } finally {
        if (mounted) {
          setHeroContentLoaded(true);
        }
      }
    };

    loadHeroContent();

    return () => {
      mounted = false;
    };
  }, []);

  const videoUrl = content.introVideoUrl?.trim() || "";

  const videoEnabled =
    content.introVideoEnabled !== false && Boolean(videoUrl);

  useEffect(() => {
    setVideoReady(false);
    setVideoError(false);
  }, [videoUrl]);

  const heroReady =
    heroContentLoaded &&
    (!videoEnabled || videoReady || videoError);

  const titleParts = (content.heroTitle || "").trim().split(/\s+/);

  const highlightText =
    titleParts.length > 1
      ? titleParts[titleParts.length - 1]
      : content.heroTitle;

  const mainTitle =
    titleParts.length > 1
      ? titleParts.slice(0, -1).join(" ")
      : "";


const textVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

  return (
    <section className="hero" id="home">
      {/* Video background */}
      <div className="hero-background">
        {videoEnabled && !videoError && (
          <video
            key={videoUrl}
            className={`hero-background-video ${
              videoReady ? "video-visible" : ""
            }`}
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            onError={() => {
              console.error("Hero video failed to load.");
              setVideoError(true);
              setVideoReady(true);
            }}
          />
        )}

        <div className="hero-video-overlay" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
      </div>

      {/* Animated loading screen */}
      <div
        className={`hero-loader ${
          heroReady ? "hero-loader-hidden" : ""
        }`}
        aria-hidden={heroReady}
      >
        <div className="hero-loader-content">
          <motion.div
            className="hero-loader-logo"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            EXPERIENCE
          </motion.div>

          <div className="hero-loader-track">
            <motion.div
              className="hero-loader-progress"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.p
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            PREPARING YOUR EXPERIENCE
          </motion.p>

          <div className="hero-loader-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div
        className={`hero-main ${
          heroReady ? "hero-main-ready" : ""
        }`}
        aria-hidden={!heroReady}
      >
        <div className="hero-side-line" />

        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate={heroReady ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.16,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              className="hero-eyebrow"
              variants={textVariants}
            >
              <span className="hero-eyebrow-line" />
              {content.heroLabel}
            </motion.div>

            
<h1>
  <motion.span
    className="hero-title-main"
    variants={textVariants}
  >
    {mainTitle}
  </motion.span>

  <motion.span
    className="hero-highlight"
    variants={textVariants}
    transition={{
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {highlightText}
  </motion.span>
</h1>

            <motion.p
              className="hero-description"
              variants={textVariants}
            >
              {content.heroDescription}
            </motion.p>

            <motion.div
              className="hero-actions"
              variants={textVariants}
            >
              <a href="#events" className="hero-primary-btn">
                {content.heroButton}
                <ArrowUpRight size={18} />
              </a>

              <a href="#contact" className="hero-secondary-btn">
                {content.heroSecondaryButton}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0, y: 18 }}
            animate={
              heroReady
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span>CREATIVE</span>
            <span className="hero-meta-divider" />
            <span>STRATEGY</span>
            <span className="hero-meta-divider" />
            <span>EXPERIENCE</span>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          className="scroll-indicator"
          initial={{ opacity: 0, y: 10 }}
          animate={
            heroReady
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
          }
          transition={{ delay: 0.9, duration: 0.7 }}
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
      </div>
    </section>
  );
}

export default Hero;
