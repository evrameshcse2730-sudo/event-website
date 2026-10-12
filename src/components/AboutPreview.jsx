
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import "./AboutPreview.css";

function AboutPreview() {
  const [content, setContent] = useState({
    label: "ABOUT US",
    title: "MORE THAN EVENTS. WE CREATE EXPERIENCES.",
    description:
      "We believe every event should have a story. From intimate celebrations to large-scale corporate experiences, we bring together creativity, planning and flawless execution.",
  });

  useEffect(() => {
    let mounted = true;

    const loadAboutContent = async () => {
      try {
        const contentRef = doc(db, "content", "website");
        const snapshot = await getDoc(contentRef);

        if (!mounted || !snapshot.exists()) return;

        const data = snapshot.data();

        if (data.about) {
          setContent((previous) => ({
            ...previous,
            ...data.about,
          }));
        }
      } catch (error) {
        console.error("Error loading about content:", error);
      }
    };

    loadAboutContent();

    return () => {
      mounted = false;
    };
  }, []);

  const titleWords = (content.title || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const splitIndex = Math.ceil(titleWords.length / 2);

  const firstTitlePart = titleWords
    .slice(0, splitIndex)
    .join(" ");

  const secondTitlePart = titleWords
    .slice(splitIndex)
    .join(" ");

  const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="about-preview" id="about">
      <div className="about-container">
        <motion.div
          className="about-top"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <span className="about-number">01</span>
          <span className="about-label">{content.label}</span>
          <span className="about-line" />
        </motion.div>

        <div className="about-main">
          <motion.div
            className="about-heading-wrap"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2>
              {firstTitlePart}
              {secondTitlePart && (
                <>
                  <br />
                  <span>{secondTitlePart}</span>
                </>
              )}
            </h2>

            <div className="about-highlight">
              <span />
              WE CREATE EXPERIENCES.
            </div>
          </motion.div>

          <motion.div
            className="about-description"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.15 }}
          >
            <p>{content.description}</p>

            <p>
              From corporate gatherings and conferences to
              celebrations and special occasions, we bring
              planning, production and execution together
              under one roof.
            </p>

            <a href="/about" className="about-link">
              Discover Our Story
              <ArrowUpRight size={17} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
