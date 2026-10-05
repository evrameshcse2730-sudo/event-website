import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { CheckCircle, Send } from "lucide-react";
import { db } from "../firebase/config";
import "./Contact.css";

const SERVICE_ID = "service_71lptkr";
const TEMPLATE_ID = "template_fnnb11l";
const PUBLIC_KEY = "zkl8juKKKBeXdmvze";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("CONTACT BUTTON CLICKED");

    if (submitting) return;

    setSuccess(false);
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.eventType) {
      setError("Please select an event type.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please enter your event details.");
      return;
    }

    setSubmitting(true);

    const data = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      eventType: formData.eventType,
      eventDate: formData.eventDate || "Not specified",
      message: formData.message.trim(),
    };

    let firebaseOK = false;
    let emailOK = false;

    // ==========================================
    // 1. SAVE ENQUIRY TO FIREBASE
    // ==========================================

    try {
      await addDoc(collection(db, "enquiries"), {
        ...data,
        status: "new",
        createdAt: serverTimestamp(),
      });

      firebaseOK = true;

      console.log("FIREBASE SUCCESS");
      console.log("ENQUIRY SAVED:", data);
    } catch (firebaseError) {
      console.error("FIREBASE ERROR:", firebaseError);
    }

    // ==========================================
    // 2. SEND EMAIL USING EMAILJS
    // ==========================================

    try {
      console.log("EMAILJS STARTING...");

      console.log("SERVICE ID:", SERVICE_ID);
      console.log("TEMPLATE ID:", TEMPLATE_ID);
      console.log("PUBLIC KEY:", PUBLIC_KEY);

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        data,
        {
          publicKey: PUBLIC_KEY,
        }
      );

      emailOK = true;

      console.log("EMAILJS SUCCESS:", result);
    } catch (emailError) {
      console.error("EMAILJS STATUS:", emailError?.status);
      console.error("EMAILJS TEXT:", emailError?.text);
      console.error("EMAILJS FULL ERROR:", emailError);
    }

    // ==========================================
    // 3. FINAL RESULT
    // ==========================================

    if (firebaseOK && emailOK) {
      setSuccess(true);
      setError("");

      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        eventDate: "",
        message: "",
      });

      console.log("CONTACT FORM COMPLETED SUCCESSFULLY");
    } else if (firebaseOK && !emailOK) {
      setSuccess(false);

      setError(
        "Enquiry saved successfully, but email notification failed."
      );

      console.log(
        "Firebase succeeded, but EmailJS failed."
      );
    } else if (!firebaseOK && emailOK) {
      setSuccess(false);

      setError(
        "Email sent successfully, but enquiry could not be saved."
      );

      console.log(
        "EmailJS succeeded, but Firebase failed."
      );
    } else {
      setSuccess(false);

      setError(
        "Unable to send enquiry. Please try again."
      );

      console.log(
        "Both Firebase and EmailJS failed."
      );
    }

    setSubmitting(false);
  };

  return (
    <main className="contact-page">

      {/* ==========================================
          CONTACT HERO
      ========================================== */}

      <section className="contact-hero section">
        <div className="container">

          <span className="section-label">
            LET'S CREATE
          </span>

          <h1 className="section-title">
            LET'S MAKE
            <br />
            IT HAPPEN.
          </h1>

          <p className="contact-intro">
            Tell us about your event and let us create
            an experience worth remembering.
          </p>

        </div>
      </section>

      {/* ==========================================
          CONTACT CONTENT
      ========================================== */}

      <section className="contact-content section">
        <div className="container">

          <div className="contact-layout">

            {/* ======================================
                CONTACT INFORMATION
            ====================================== */}

            <div className="contact-info">

              <span className="section-label">
                GET IN TOUCH
              </span>

              <h2>
                Have an event
                <br />
                <span>in mind?</span>
              </h2>

              <p>
                Whether it is a corporate event, wedding,
                conference, launch or celebration, tell us
                what you have in mind.
              </p>

              <div className="contact-details">

                <div>
                  <span>PHONE</span>

                  <a href="tel:+919999999999">
                    +91 99999 99999
                  </a>
                </div>

                <div>
                  <span>EMAIL</span>

                  <a href="mailto:hello@eventstudio.com">
                    hello@eventstudio.com
                  </a>
                </div>

                <div>
                  <span>LOCATION</span>

                  <p>
                    Hyderabad, Telangana, India
                  </p>
                </div>

              </div>

            </div>

            {/* ======================================
                CONTACT FORM
            ====================================== */}

            <div className="contact-form-wrapper">

              {/* SUCCESS MESSAGE */}

              {success && (
                <div className="contact-success">

                  <CheckCircle size={22} />

                  <div>
                    <strong>
                      Enquiry sent successfully.
                    </strong>

                    <p>
                      Our team will get back to you soon.
                    </p>
                  </div>

                </div>
              )}

              {/* ERROR MESSAGE */}

              {error && (
                <div className="contact-error">
                  {error}
                </div>
              )}

              <form
                className="contact-form"
                onSubmit={(e) => e.preventDefault()}
              >

                {/* NAME */}

                <div className="form-group">

                  <label htmlFor="contact-name">
                    YOUR NAME
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                  />

                </div>

                {/* PHONE */}

                <div className="form-group">

                  <label htmlFor="contact-phone">
                    PHONE NUMBER
                  </label>

                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    autoComplete="tel"
                  />

                </div>

                {/* EMAIL */}

                <div className="form-group">

                  <label htmlFor="contact-email">
                    EMAIL ADDRESS
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />

                </div>

                {/* EVENT TYPE */}

                <div className="form-group">

                  <label htmlFor="contact-event-type">
                    EVENT TYPE
                  </label>

                  <select
                    id="contact-event-type"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select event type
                    </option>

                    <option value="Corporate Event">
                      Corporate Event
                    </option>

                    <option value="Wedding">
                      Wedding & Celebration
                    </option>

                    <option value="Conference">
                      Conference & Summit
                    </option>

                    <option value="Product Launch">
                      Product Launch
                    </option>

                    <option value="Cultural Event">
                      Cultural Event
                    </option>

                    <option value="Private Event">
                      Private / Special Event
                    </option>

                  </select>

                </div>

                {/* EVENT DATE */}

                <div className="form-group">

                  <label htmlFor="contact-event-date">
                    EVENT DATE
                  </label>

                  <input
                    id="contact-event-date"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                  />

                </div>

                {/* MESSAGE */}

                <div className="form-group">

                  <label htmlFor="contact-message">
                    TELL US ABOUT YOUR EVENT
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us about your event, requirements and expectations..."
                  />

                </div>

                {/* SUBMIT */}

                <button
                  type="button"
                  className="contact-submit"
                  onClick={handleSubmit}
                  disabled={submitting}
                >

                  {submitting ? (
                    <span>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <span>
                        Send Enquiry
                      </span>

                      <Send size={18} />
                    </>
                  )}

                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Contact;