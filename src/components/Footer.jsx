import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import "./Footer.css";

function Footer() {
  const [content, setContent] = useState({
    description:
      "We create meaningful experiences through thoughtful planning, creative direction and seamless execution.",

    copyright:
      "© 2026 EVENT. ALL RIGHTS RESERVED.",
  });

  useEffect(() => {
    const loadFooterContent = async () => {
      try {
        const contentRef = doc(
          db,
          "content",
          "website"
        );

        const snapshot = await getDoc(contentRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          if (data.footer) {
            setContent((previous) => ({
              ...previous,
              ...data.footer,
            }));
          }
        }
      } catch (error) {
        console.error(
          "Error loading footer content:",
          error
        );
      }
    };

    loadFooterContent();
  }, []);

  return (
    <footer className="footer">
      <div className="container">

        <div className="footer__main">

          <div className="footer__brand">

            <a
              href="/"
              className="footer__logo"
            >
              EVENT<span>.</span>
            </a>

            <p>
              {content.description}
            </p>

            <a
              href="/contact"
              className="footer__cta"
            >
              PLAN YOUR EVENT →
            </a>

          </div>


          <div className="footer__links">

            <div className="footer__group">

              <h4>EXPLORE</h4>

              <a href="/">Home</a>

              <a href="/about">About</a>

              <a href="/events">Events</a>

              <a href="/gallery">Gallery</a>

              <a href="/contact">Contact</a>

            </div>


            <div className="footer__group">

              <h4>EVENT TYPES</h4>

              <a href="/events/corporate-events">
                Corporate Events
              </a>

              <a href="/events/weddings">
                Weddings
              </a>

              <a href="/events/conferences">
                Conferences
              </a>

              <a href="/events/product-launches">
                Product Launches
              </a>

              <a href="/events/cultural-events">
                Cultural Events
              </a>

            </div>


            <div className="footer__group">

              <h4>CONTACT</h4>

              <a href="tel:+919999999999">
                +91 99999 99999
              </a>

              <a href="mailto:hello@yourevents.com">
                hello@yourevents.com
              </a>

              <p>
                Hyderabad,
                <br />
                Telangana, India
              </p>

            </div>

          </div>

        </div>


        <div className="footer__social">

          <span>
            FOLLOW OUR JOURNEY
          </span>

          <div>

            <a href="#">
              Instagram
            </a>

            <a href="#">
              Facebook
            </a>

            <a href="#">
              LinkedIn
            </a>

            <a href="#">
              YouTube
            </a>

          </div>

        </div>


        <div className="footer__bottom">

          <span>
            {content.copyright}
          </span>

          <div>

            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;