import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
} from "lucide-react";
import "./Contact.css";

function Contact() {
  return (
    <section className="contact">
      <div className="container">
        <div className="contact__header">
          <motion.div
            className="contact__label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            GET IN TOUCH
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            LET'S TALK ABOUT
            <br />
            YOUR <span>EVENT.</span>
          </motion.h2>
        </div>

        <div className="contact__grid">
          {/* Left side */}

          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="contact__intro">
              Have an event in mind? Tell us what you're planning and we'll
              get back to you with the next steps.
            </p>

            <div className="contact__details">
              <a href="tel:+919999999999" className="contact__detail">
                <div className="contact__icon">
                  <Phone size={18} />
                </div>

                <div>
                  <span>CALL US</span>
                  <strong>+91 99999 99999</strong>
                </div>
              </a>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="contact__detail"
              >
                <div className="contact__icon">
                  <MessageCircle size={18} />
                </div>

                <div>
                  <span>WHATSAPP</span>
                  <strong>Start a Conversation</strong>
                </div>
              </a>

              <a
                href="mailto:hello@yourevents.com"
                className="contact__detail"
              >
                <div className="contact__icon">
                  <Mail size={18} />
                </div>

                <div>
                  <span>EMAIL</span>
                  <strong>hello@yourevents.com</strong>
                </div>
              </a>

              <div className="contact__detail">
                <div className="contact__icon">
                  <MapPin size={18} />
                </div>

                <div>
                  <span>LOCATION</span>
                  <strong>Hyderabad, Telangana</strong>
                </div>
              </div>
            </div>

            <div className="contact__map">
              <div className="contact__map-grid"></div>

              <div className="contact__map-pin">
                <MapPin size={25} />
              </div>

              <span>GOOGLE MAPS</span>
            </div>
          </motion.div>

          {/* Form */}

          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form className="contact__form">
              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="name">YOUR NAME</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="phone">PHONE NUMBER</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="email">EMAIL ADDRESS</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="event-type">EVENT TYPE</label>

                  <select id="event-type" defaultValue="">
                    <option value="" disabled>
                      Select event type
                    </option>
                    <option value="corporate">Corporate Event</option>
                    <option value="wedding">Wedding</option>
                    <option value="conference">Conference</option>
                    <option value="product-launch">
                      Product Launch
                    </option>
                    <option value="cultural">Cultural Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="date">EVENT DATE</label>
                  <input id="date" type="date" />
                </div>

                <div className="contact__field">
                  <label htmlFor="guests">EXPECTED GUESTS</label>

                  <select id="guests" defaultValue="">
                    <option value="" disabled>
                      Select approximate size
                    </option>
                    <option value="under-50">Under 50</option>
                    <option value="50-100">50 - 100</option>
                    <option value="100-250">100 - 250</option>
                    <option value="250-500">250 - 500</option>
                    <option value="500-plus">500+</option>
                  </select>
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="message">TELL US ABOUT YOUR EVENT</label>

                <textarea
                  id="message"
                  rows="5"
                  placeholder="Tell us about your event, requirements and what you're imagining..."
                ></textarea>
              </div>

              <button type="submit" className="contact__submit">
                SEND ENQUIRY
                <Send size={18} />
              </button>

              <p className="contact__note">
                We'll get back to you as soon as possible.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;