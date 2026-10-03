import { motion } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import "./Testimonials.css";

const testimonials = [
  {
    quote:
      "The entire event felt thoughtfully planned from beginning to end. Every detail came together beautifully and our guests had an unforgettable experience.",
    name: "Rahul Mehta",
    role: "Business Summit Client",
    company: "Hyderabad",
  },
  {
    quote:
      "They understood what we wanted and transformed the idea into an experience that felt personal, elegant and completely seamless.",
    name: "Ananya Rao",
    role: "Wedding Client",
    company: "Vijayawada",
  },
  {
    quote:
      "From creative planning to execution, the team handled everything with great attention to detail. The launch created exactly the impact we wanted.",
    name: "Arjun Varma",
    role: "Brand Launch Client",
    company: "Bengaluru",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__top">
          <motion.div
            className="testimonials__label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            CLIENT STORIES
          </motion.div>

          <motion.div
            className="testimonials__count"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            01 / 03
          </motion.div>
        </div>

        <motion.div
          className="testimonials__main"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="testimonials__quote-icon">
            <Quote size={32} strokeWidth={1.3} />
          </div>

          <blockquote>
            {testimonials[0].quote}
          </blockquote>
        </motion.div>

        <div className="testimonials__bottom">
          <motion.div
            className="testimonials__person"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="testimonials__avatar">
              RM
            </div>

            <div>
              <h3>{testimonials[0].name}</h3>
              <p>
                {testimonials[0].role} · {testimonials[0].company}
              </p>
            </div>
          </motion.div>

          <div className="testimonials__controls">
            <button aria-label="Previous testimonial">
              <ArrowLeft size={18} />
            </button>

            <button aria-label="Next testimonial">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;