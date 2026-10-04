import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";

import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <section className="contact-page__hero">
        <div className="container">

          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            LET'S CREATE SOMETHING
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            LET'S MAKE
            <br />
            <span>IT HAPPEN.</span>
          </motion.h1>

          <p>
            Tell us about your event, your vision and what you want
            your guests to remember.
          </p>

        </div>
      </section>

      <section className="contact-page__main section">
        <div className="container">

          <div className="contact-page__grid">

            <div className="contact-page__info">

              <span className="section-label">
                GET IN TOUCH
              </span>

              <h2>
                START A
                <br />
                CONVERSATION.
              </h2>

              <div className="contact-page__details">

                <a href="tel:+919999999999">
                  <Phone size={20} />
                  <span>
                    <small>PHONE</small>
                    +91 99999 99999
                  </span>
                </a>

                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={20} />
                  <span>
                    <small>WHATSAPP</small>
                    Chat With Us
                  </span>
                </a>

                <a href="mailto:hello@yourevents.com">
                  <Mail size={20} />
                  <span>
                    <small>EMAIL</small>
                    hello@yourevents.com
                  </span>
                </a>

                <div>
                  <MapPin size={20} />
                  <span>
                    <small>LOCATION</small>
                    Hyderabad, Telangana
                  </span>
                </div>

              </div>

            </div>

            <motion.form
              className="contact-page__form"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >

              <div className="contact-page__field-row">

                <div className="contact-page__field">
                  <label>YOUR NAME</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="contact-page__field">
                  <label>PHONE</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                  />
                </div>

              </div>

              <div className="contact-page__field">
                <label>EMAIL</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="contact-page__field-row">

                <div className="contact-page__field">
                  <label>EVENT TYPE</label>

                  <select defaultValue="">
                    <option value="" disabled>
                      Select event type
                    </option>
                    <option>Corporate Event</option>
                    <option>Wedding</option>
                    <option>Conference</option>
                    <option>Product Launch</option>
                    <option>Cultural Event</option>
                  </select>
                </div>

                <div className="contact-page__field">
                  <label>EVENT DATE</label>
                  <input type="date" />
                </div>

              </div>

              <div className="contact-page__field">
                <label>EXPECTED GUESTS</label>
                <input
                  type="number"
                  placeholder="Approximate guest count"
                />
              </div>

              <div className="contact-page__field">
                <label>TELL US ABOUT YOUR EVENT</label>

                <textarea
                  rows="5"
                  placeholder="Tell us about your event..."
                />
              </div>

              <button
                type="submit"
                className="contact-page__submit"
              >
                SEND ENQUIRY
                <ArrowUpRight size={20} />
              </button>

            </motion.form>

          </div>

        </div>
      </section>

      <section className="contact-page__map">

        <div className="contact-page__map-placeholder">
          <MapPin size={32} />

          <span>
            GOOGLE MAPS LOCATION
          </span>

          <small>
            Hyderabad, Telangana
          </small>
        </div>

      </section>

    </div>
  );
}

export default Contact;