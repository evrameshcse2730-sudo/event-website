
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Save, Loader2, Upload, Video } from "lucide-react";

import { db } from "../firebase/config";
import "./ContentManager.css";

const CLOUD_NAME = "naywosl2";
const UPLOAD_PRESET = "event_website_uploads";

const DEFAULT_VIDEO =
  "https://res.cloudinary.com/db4faz2rs/video/upload/v1788245248/Task-1_yyfhwg.mp4";

const DEFAULT_CONTENT = {
  home: {
    heroLabel: "EVENT MANAGEMENT & EXPERIENCES",
    heroTitle: "WE CREATE EXPERIENCES.",
    heroDescription:
      "We design and deliver memorable events with creativity, precision and attention to every detail.",
    heroButton: "EXPLORE EVENTS",
    heroSecondaryButton: "CONTACT US",
    introVideoUrl: DEFAULT_VIDEO,
    introVideoEnabled: true,
    introVideoDuration: 15,
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
    copyright: "© 2026 EVENT. All rights reserved.",
  },
};

function ContentManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      try {
        const contentRef = doc(db, "content", "website");
        const snapshot = await getDoc(contentRef);

        if (!mounted) return;

        if (snapshot.exists()) {
          const data = snapshot.data();

          setContent((previous) => ({
            ...previous,
            ...data,
            home: {
              ...previous.home,
              ...(data.home || {}),
            },
            about: {
              ...previous.about,
              ...(data.about || {}),
            },
            contact: {
              ...previous.contact,
              ...(data.contact || {}),
            },
            footer: {
              ...previous.footer,
              ...(data.footer || {}),
            },
          }));
        }
      } catch (error) {
        console.error("Error loading website content:", error);
        if (mounted) {
          setMessage("Unable to load website content.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadContent();

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (section, field, value) => {
    setContent((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [field]: value,
      },
    }));
  };

  const handleVideoUpload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setMessage("Please select a valid video file.");
      return;
    }

    try {
      setUploading(true);
      setMessage("Uploading video to Cloudinary...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "event-website/home-intro");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.secure_url) {
        throw new Error(
          result.error?.message || "Video upload failed."
        );
      }

      setContent((previous) => ({
        ...previous,
        home: {
          ...previous.home,
          introVideoUrl: result.secure_url,
        },
      }));

      setMessage(
        "Video uploaded. Click Save Changes to publish it."
      );
    } catch (error) {
      console.error("Cloudinary video upload error:", error);
      setMessage(error.message || "Unable to upload video.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const contentRef = doc(db, "content", "website");

      await setDoc(
        contentRef,
        {
          ...content,
          status: "published",
          updatedAt: new Date(),
        },
        { merge: true }
      );

      setMessage("Website content saved successfully.");
    } catch (error) {
      console.error("Error saving website content:", error);
      setMessage("Failed to save website content. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="content-manager-loading">
        <Loader2 size={24} className="content-loading-icon" />
        <span>Loading website content...</span>
      </div>
    );
  }

  return (
    <div className="content-manager">
      <div className="content-manager-header">
        <div>
          <span className="content-manager-label">WEBSITE CONTENT</span>
          <h1>Manage Website</h1>
          <p>Update website text and opening video without editing code.</p>
        </div>

        <button
          type="button"
          className="content-save-button"
          onClick={handleSave}
          disabled={saving || uploading}
        >
          {saving ? (
            <>
              <Loader2 size={18} className="content-loading-icon" />
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

      {message && (
        <div className="content-manager-message" role="status">
          {message}
        </div>
      )}

      {/* HOME PAGE */}
      <section className="content-section">
        <div className="content-section-heading">
          <span>01</span>
          <div>
            <h2>Home Page</h2>
            <p>Edit the main hero section content.</p>
          </div>
        </div>

        <div className="content-fields">
          <div className="content-field">
            <label>Hero Label</label>
            <input
              type="text"
              value={content.home.heroLabel}
              onChange={(e) =>
                handleChange("home", "heroLabel", e.target.value)
              }
            />
          </div>

          <div className="content-field">
            <label>Hero Title</label>
            <input
              type="text"
              value={content.home.heroTitle}
              onChange={(e) =>
                handleChange("home", "heroTitle", e.target.value)
              }
            />
          </div>

          <div className="content-field content-field-full">
            <label>Hero Description</label>
            <textarea
              rows={4}
              value={content.home.heroDescription}
              onChange={(e) =>
                handleChange("home", "heroDescription", e.target.value)
              }
            />
          </div>

          <div className="content-field">
            <label>Primary Button</label>
            <input
              type="text"
              value={content.home.heroButton}
              onChange={(e) =>
                handleChange("home", "heroButton", e.target.value)
              }
            />
          </div>

          <div className="content-field">
            <label>Secondary Button</label>
            <input
              type="text"
              value={content.home.heroSecondaryButton}
              onChange={(e) =>
                handleChange("home", "heroSecondaryButton", e.target.value)
              }
            />
          </div>
        </div>
      </section>

      {/* HOME OPENING VIDEO */}
      <section className="content-section">
        <div className="content-section-heading">
          <span>02</span>
          <div>
            <h2>Home Opening Video</h2>
            <p>Control the video displayed when visitors open Home.</p>
          </div>
        </div>

        <div className="content-fields">
          <div className="content-field content-field-full">
            <label>
              <Video size={16} /> Upload New Video
            </label>

            <input
              type="file"
              accept="video/*"
              disabled={uploading || saving}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleVideoUpload(file);
                e.target.value = "";
              }}
            />

            <small>
              {uploading
                ? "Uploading video..."
                : "Select a video file. Save Changes after upload finishes."}
            </small>
          </div>

          <div className="content-field content-field-full">
            <label>Video URL</label>
            <input
              type="url"
              value={content.home.introVideoUrl || ""}
              placeholder="https://res.cloudinary.com/..."
              onChange={(e) =>
                handleChange("home", "introVideoUrl", e.target.value)
              }
            />
          </div>

          <div className="content-field">
            <label>Opening Video</label>
            <select
              value={
                content.home.introVideoEnabled ? "enabled" : "disabled"
              }
              onChange={(e) =>
                handleChange(
                  "home",
                  "introVideoEnabled",
                  e.target.value === "enabled"
                )
              }
            >
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          <div className="content-field">
            <label>Display Duration (seconds)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={content.home.introVideoDuration ?? 15}
              onChange={(e) => {
                const value = Math.min(
                  60,
                  Math.max(1, Number(e.target.value) || 15)
                );

                handleChange("home", "introVideoDuration", value);
              }}
            />
          </div>

          {content.home.introVideoUrl && (
            <div className="content-field content-field-full">
              <label>Video Preview</label>
              <video
                key={content.home.introVideoUrl}
                src={content.home.introVideoUrl}
                controls
                playsInline
                preload="metadata"
                className="content-video-preview"
              />
            </div>
          )}
        </div>
      </section>

      {/* ABOUT PAGE */}
      <section className="content-section">
        <div className="content-section-heading">
          <span>03</span>
          <div>
            <h2>About Page</h2>
            <p>Company introduction content.</p>
          </div>
        </div>

        <div className="content-fields">
          <div className="content-field">
            <label>Section Label</label>
            <input
              type="text"
              value={content.about.label}
              onChange={(e) =>
                handleChange("about", "label", e.target.value)
              }
            />
          </div>

          <div className="content-field">
            <label>Title</label>
            <input
              type="text"
              value={content.about.title}
              onChange={(e) =>
                handleChange("about", "title", e.target.value)
              }
            />
          </div>

          <div className="content-field content-field-full">
            <label>Description</label>
            <textarea
              rows={6}
              value={content.about.description}
              onChange={(e) =>
                handleChange("about", "description", e.target.value)
              }
            />
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="content-section">
        <div className="content-section-heading">
          <span>04</span>
          <div>
            <h2>Contact Information</h2>
            <p>Contact details displayed on the website.</p>
          </div>
        </div>

        <div className="content-fields">
          <div className="content-field">
            <label>Contact Title</label>
            <input
              type="text"
              value={content.contact.title}
              onChange={(e) =>
                handleChange("contact", "title", e.target.value)
              }
            />
          </div>

          <div className="content-field">
            <label>Phone</label>
            <input
              type="text"
              value={content.contact.phone}
              onChange={(e) =>
                handleChange("contact", "phone", e.target.value)
              }
            />
          </div>

          <div className="content-field">
            <label>Email</label>
            <input
              type="email"
              value={content.contact.email}
              onChange={(e) =>
                handleChange("contact", "email", e.target.value)
              }
            />
          </div>

          <div className="content-field">
            <label>Address</label>
            <input
              type="text"
              value={content.contact.address}
              onChange={(e) =>
                handleChange("contact", "address", e.target.value)
              }
            />
          </div>

          <div className="content-field content-field-full">
            <label>Contact Description</label>
            <textarea
              rows={4}
              value={content.contact.description}
              onChange={(e) =>
                handleChange("contact", "description", e.target.value)
              }
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="content-section">
        <div className="content-section-heading">
          <span>05</span>
          <div>
            <h2>Footer</h2>
            <p>Footer text and copyright.</p>
          </div>
        </div>

        <div className="content-fields">
          <div className="content-field content-field-full">
            <label>Footer Description</label>
            <textarea
              rows={4}
              value={content.footer.description}
              onChange={(e) =>
                handleChange("footer", "description", e.target.value)
              }
            />
          </div>

          <div className="content-field content-field-full">
            <label>Copyright Text</label>
            <input
              type="text"
              value={content.footer.copyright}
              onChange={(e) =>
                handleChange("footer", "copyright", e.target.value)
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
          disabled={saving || uploading}
        >
          {saving ? (
            <>
              <Loader2 size={18} className="content-loading-icon" />
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
