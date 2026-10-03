import { motion } from "framer-motion";
import {
  Sparkles,
  Layers3,
  Users,
  Target,
} from "lucide-react";
import "./WhyChooseUs.css";

const reasons = [
  {
    number: "01",
    icon: Sparkles,
    title: "CREATIVE THINKING",
    text: "Every event begins with an idea and we turn that idea into an experience people remember.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "END-TO-END EXECUTION",
    text: "From planning and production to coordination and final execution, every detail stays connected.",
  },
  {
    number: "03",
    icon: Users,
    title: "PEOPLE FIRST",
    text: "We design experiences around people, emotions, interaction and the moments that matter.",
  },
  {
    number: "04",
    icon: Target,
    title: "DETAILS THAT MATTER",
    text: "The smallest details can change the atmosphere. We pay attention to every part of the experience.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-choose">
      <div className="container">
        <div className="why-choose__intro">
          <motion.div
            className="why-choose__label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            WHY CHOOSE US
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            GREAT EVENTS ARE
            <br />
            BUILT ON <span>GREAT DETAILS.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We bring together creativity, planning and execution to create
            experiences that feel effortless for the people attending them.
          </motion.p>
        </div>

        <div className="why-choose__list">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                className="why-choose__item"
                key={reason.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
              >
                <div className="why-choose__number">
                  {reason.number}
                </div>

                <div className="why-choose__icon">
                  <Icon size={23} strokeWidth={1.5} />
                </div>

                <div className="why-choose__content">
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </div>

                <div className="why-choose__line"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;