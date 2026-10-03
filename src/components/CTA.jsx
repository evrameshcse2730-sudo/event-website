import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./CTA.css";

function CTA() {
  return (
    <section className="cta">
      <div className="cta__glow cta__glow--one"></div>
      <div className="cta__glow cta__glow--two"></div>

      <div className="container">
        <div className="cta__content">
          <motion.div
            className="cta__label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            LET'S CREATE TOGETHER
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            YOUR NEXT EVENT
            <br />
            SHOULD FEEL <span>UNFORGETTABLE.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Tell us what you're imagining. We'll help turn the idea into an
            experience worth remembering.
          </motion.p>

          <motion.a
            href="/contact"
            className="cta__button"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            START A CONVERSATION
            <ArrowUpRight size={21} />
          </motion.a>
        </div>

        <div className="cta__bottom">
          <span>EVENTS / EXPERIENCES / MEMORIES</span>
          <span>LET'S MAKE IT MATTER.</span>
        </div>
      </div>
    </section>
  );
}

export default CTA;