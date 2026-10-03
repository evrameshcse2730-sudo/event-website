import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import "./FeaturedEvent.css";

function FeaturedEvent() {
  return (
    <section className="featured-event">
      <div className="featured-event__visual">
        <div className="featured-event__overlay"></div>

        <div className="featured-event__pattern"></div>

        <div className="featured-event__content container">
          <motion.div
            className="featured-event__label"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            FEATURED EVENT
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            BUSINESS
            <br />
            SUMMIT <span>2026</span>
          </motion.h2>

          <motion.p
            className="featured-event__description"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A powerful gathering of business leaders, innovators and
            decision-makers, designed around meaningful conversations and
            memorable experiences.
          </motion.p>

          <motion.div
            className="featured-event__details"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div>
              <CalendarDays size={18} />
              <span>18 OCTOBER 2026</span>
            </div>

            <div>
              <MapPin size={18} />
              <span>HYDERABAD</span>
            </div>
          </motion.div>

          <motion.a
            href="/events/business-summit-2026"
            className="featured-event__button"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            VIEW EVENT
            <ArrowUpRight size={20} />
          </motion.a>
        </div>

        <div className="featured-event__side-text">
          EXPERIENCE / 01
        </div>
      </div>
    </section>
  );
}

export default FeaturedEvent;