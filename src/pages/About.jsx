import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./About.css";

function About() {
  return (
    <main className="about-page">

      <section className="about-page__hero">
        <div className="container">
          <motion.span
            className="about-page__label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ABOUT US
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            WE CREATE
            <br />
            <span>EXPERIENCES.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            We are an event management team focused on creating meaningful,
            beautifully planned and memorable experiences.
          </motion.p>
        </div>
      </section>

      <section className="about-page__story">
        <div className="container about-page__story-grid">

          <div className="about-page__visual">
            <div>
              <span>OUR STORY</span>
            </div>
          </div>

          <div className="about-page__content">
            <span className="section-label">
              THE EXPERIENCE
            </span>

            <h2>
              FROM AN IDEA
              <br />
              TO A <span>MOMENT.</span>
            </h2>

            <p>
              Every successful event starts with an idea. Our role is to
              transform that idea into an experience that feels intentional,
              engaging and memorable.
            </p>

            <p>
              From creative planning and production to coordination and
              execution, we bring every part of the event together under one
              vision.
            </p>

            <a href="/contact">
              START A CONVERSATION
              <ArrowUpRight size={18} />
            </a>
          </div>

        </div>
      </section>

      <section className="about-page__values">
        <div className="container">

          <div className="about-page__values-header">
            <span className="section-label">
              WHAT DRIVES US
            </span>

            <h2>
              BUILT AROUND
              <br />
              <span>PEOPLE & PURPOSE.</span>
            </h2>
          </div>

          <div className="about-page__values-grid">

            <div>
              <strong>01</strong>
              <h3>CREATIVITY</h3>
              <p>
                Ideas that make every event feel distinctive and personal.
              </p>
            </div>

            <div>
              <strong>02</strong>
              <h3>PRECISION</h3>
              <p>
                Thoughtful planning where every detail has a purpose.
              </p>
            </div>

            <div>
              <strong>03</strong>
              <h3>EXPERIENCE</h3>
              <p>
                Designing moments people remember long after the event.
              </p>
            </div>

            <div>
              <strong>04</strong>
              <h3>TRUST</h3>
              <p>
                Clear communication and dependable execution from start to
                finish.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default About;