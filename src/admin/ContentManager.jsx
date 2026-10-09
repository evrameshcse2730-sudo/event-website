import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { Save, Loader2 } from "lucide-react";

import { db } from "../firebase/config";
import "./ContentManager.css";

function ContentManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [content, setContent] = useState({
    home: {
      heroLabel: "EVENT MANAGEMENT & EXPERIENCES",
      heroTitle: "WE CREATE EXPERIENCES.",
      heroDescription:
        "We design and deliver memorable events with creativity, precision and attention to every detail.",
      heroButton: "EXPLORE EVENTS",
      heroSecondaryButton: "CONTACT US",
    },

    about: {
      label: "ABOUT US",
      title: "MORE THAN EVENTS. WE CREATE EXPERIENCES.",
      description:
        "We believe every event should have a story. From intimate celebrations to large-scale corporate experiences, we bring together creativity, planning and flawless execution.",
    },

    contact: {
      title: "LET'S CREATE SOMETHING MEMORABLE.",
      description:
        "Have an event in mind? Tell us about it and let's bring your vision to life.",
      phone: "+91 99999 99999",
      email: "hello@eventstudio.com",
      address: "Hyderabad, Telangana, India",
    },

    footer: {
      description:
        "Creating meaningful events, unforgettable experiences and moments that stay with you.",
      copyright:
        "© 2026 EVENT. All rights reserved.",
    },
  });

  // ==========================================
  // LOAD CONTENT
  // ==========================================

  useEffect(() => {
    const loadContent = async () => {
      try {
        const contentRef = doc(
          db,
          "content",
          "website"
        );

        const snapshot = await getDoc(contentRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setContent((previous) => ({
            ...previous,
            ...data,
          }));
        }
      } catch (error) {
        console.error(
          "Error loading website content:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // ==========================================
  // INPUT HANDLER
  // ==========================================

  const handleChange = (
    section,
    field,
    value
  ) => {
    setContent((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [field]: value,
      },
    }));
  };

  // ==========================================
  // SAVE CONTENT
  // ==========================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const contentRef = doc(
        db,
        "content",
        "website"
      );

      await setDoc(
        contentRef,
        {
          ...content,
          status: "published",
          updatedAt: new Date(),
        },
        {
          merge: true,
        }
      );

      setMessage(
        "Website content saved successfully."
      );
    } catch (error) {
      console.error(
        "Error saving website content:",
        error
      );

      setMessage(
        "Failed to save website content."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="content-manager-loading">
        <Loader2
          size={24}
          className="content-loading-icon"
        />

        <span>
          Loading website content...
        </span>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="content-manager">

      {/* HEADER */}

      <div className="content-manager-header">

        <div>
          <span className="content-manager-label">
            WEBSITE CONTENT
          </span>

          <h1>
            Manage Website
          </h1>

          <p>
            Update website text without editing
            the code.
          </p>
        </div>

        <button
          type="button"
          className="content-save-button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2
                size={18}
                className="content-loading-icon"
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={18} />

              Save Changes
            </>
          )}
        </button>

      </div>


      {/* MESSAGE */}

      {message && (
        <div className="content-manager-message">
          {message}
        </div>
      )}


      {/* ==========================================
          HOME
      ========================================== */}

      <section className="content-section">

        <div className="content-section-heading">
          <span>01</span>

          <div>
            <h2>
              Home Page
            </h2>

            <p>
              Main hero section content.
            </p>
          </div>
        </div>


        <div className="content-fields">

          <div className="content-field">

            <label>
              Hero Label
            </label>

            <input
              type="text"
              value={content.home.heroLabel}
              onChange={(e) =>
                handleChange(
                  "home",
                  "heroLabel",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field">

            <label>
              Hero Title
            </label>

            <input
              type="text"
              value={content.home.heroTitle}
              onChange={(e) =>
                handleChange(
                  "home",
                  "heroTitle",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field content-field-full">

            <label>
              Hero Description
            </label>

            <textarea
              rows="4"
              value={content.home.heroDescription}
              onChange={(e) =>
                handleChange(
                  "home",
                  "heroDescription",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field">

            <label>
              Primary Button
            </label>

            <input
              type="text"
              value={content.home.heroButton}
              onChange={(e) =>
                handleChange(
                  "home",
                  "heroButton",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field">

            <label>
              Secondary Button
            </label>

            <input
              type="text"
              value={
                content.home.heroSecondaryButton
              }
              onChange={(e) =>
                handleChange(
                  "home",
                  "heroSecondaryButton",
                  e.target.value
                )
              }
            />

          </div>

        </div>

      </section>


      {/* ==========================================
          ABOUT
      ========================================== */}

      <section className="content-section">

        <div className="content-section-heading">

          <span>02</span>

          <div>
            <h2>
              About Page
            </h2>

            <p>
              Company introduction content.
            </p>
          </div>

        </div>


        <div className="content-fields">

          <div className="content-field">

            <label>
              Section Label
            </label>

            <input
              type="text"
              value={content.about.label}
              onChange={(e) =>
                handleChange(
                  "about",
                  "label",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field">

            <label>
              Title
            </label>

            <input
              type="text"
              value={content.about.title}
              onChange={(e) =>
                handleChange(
                  "about",
                  "title",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field content-field-full">

            <label>
              Description
            </label>

            <textarea
              rows="6"
              value={content.about.description}
              onChange={(e) =>
                handleChange(
                  "about",
                  "description",
                  e.target.value
                )
              }
            />

          </div>

        </div>

      </section>


      {/* ==========================================
          CONTACT
      ========================================== */}

      <section className="content-section">

        <div className="content-section-heading">

          <span>03</span>

          <div>
            <h2>
              Contact Information
            </h2>

            <p>
              Contact details displayed on the
              website.
            </p>
          </div>

        </div>


        <div className="content-fields">

          <div className="content-field">

            <label>
              Contact Title
            </label>

            <input
              type="text"
              value={content.contact.title}
              onChange={(e) =>
                handleChange(
                  "contact",
                  "title",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field">

            <label>
              Phone
            </label>

            <input
              type="text"
              value={content.contact.phone}
              onChange={(e) =>
                handleChange(
                  "contact",
                  "phone",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field">

            <label>
              Email
            </label>

            <input
              type="email"
              value={content.contact.email}
              onChange={(e) =>
                handleChange(
                  "contact",
                  "email",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field">

            <label>
              Address
            </label>

            <input
              type="text"
              value={content.contact.address}
              onChange={(e) =>
                handleChange(
                  "contact",
                  "address",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field content-field-full">

            <label>
              Contact Description
            </label>

            <textarea
              rows="4"
              value={content.contact.description}
              onChange={(e) =>
                handleChange(
                  "contact",
                  "description",
                  e.target.value
                )
              }
            />

          </div>

        </div>

      </section>


      {/* ==========================================
          FOOTER
      ========================================== */}

      <section className="content-section">

        <div className="content-section-heading">

          <span>04</span>

          <div>
            <h2>
              Footer
            </h2>

            <p>
              Footer text and copyright.
            </p>
          </div>

        </div>


        <div className="content-fields">

          <div className="content-field content-field-full">

            <label>
              Footer Description
            </label>

            <textarea
              rows="4"
              value={content.footer.description}
              onChange={(e) =>
                handleChange(
                  "footer",
                  "description",
                  e.target.value
                )
              }
            />

          </div>


          <div className="content-field content-field-full">

            <label>
              Copyright Text
            </label>

            <input
              type="text"
              value={content.footer.copyright}
              onChange={(e) =>
                handleChange(
                  "footer",
                  "copyright",
                  e.target.value
                )
              }
            />

          </div>

        </div>

      </section>


      {/* BOTTOM SAVE */}

      <div className="content-bottom-save">

        <button
          type="button"
          className="content-save-button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2
                size={18}
                className="content-loading-icon"
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={18} />

              Save Changes
            </>
          )}
        </button>

      </div>

    </div>
  );
}

export default ContentManager;