import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import "./TestimonialsManager.css";

const CLOUD_NAME = "db4faz2rs";
const UPLOAD_PRESET = "event_website_uploads";

function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    company: "",
    quote: "",
    imageUrl: "",
    status: "published",
  });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "testimonials")
      );

      const data = snapshot.docs
        .map((item) => ({
          id: item.id,
          ...item.data(),
        }))
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;

          return bTime - aTime;
        });

      setTestimonials(data);
    } catch (error) {
      console.error("Error loading testimonials:", error);
      alert("Unable to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size should be below 10MB.");
      return;
    }

    try {
      setUploading(true);

      const uploadData = new FormData();

      uploadData.append("file", file);
      uploadData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || "Image upload failed."
        );
      }

      setForm((prev) => ({
        ...prev,
        imageUrl: data.secure_url,
      }));

      alert("Client image uploaded successfully.");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert("Client image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      designation: "",
      company: "",
      quote: "",
      imageUrl: "",
      status: "published",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter client name.");
      return;
    }

    if (!form.quote.trim()) {
      alert("Please enter testimonial.");
      return;
    }

    if (uploading) {
      alert("Please wait until the image upload finishes.");
      return;
    }

    try {
      setSaving(true);

      const testimonialData = {
        name: form.name.trim(),
        designation: form.designation.trim(),
        company: form.company.trim(),
        quote: form.quote.trim(),
        imageUrl: form.imageUrl,
        status: form.status,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(
          doc(db, "testimonials", editingId),
          testimonialData
        );

        alert("Testimonial updated successfully.");
      } else {
        await addDoc(collection(db, "testimonials"), {
          ...testimonialData,
          createdAt: serverTimestamp(),
        });

        alert("Testimonial added successfully.");
      }

      resetForm();
      await fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Unable to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);

    setForm({
      name: testimonial.name || "",
      designation: testimonial.designation || "",
      company: testimonial.company || "",
      quote: testimonial.quote || "",
      imageUrl: testimonial.imageUrl || "",
      status: testimonial.status || "published",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "testimonials", id));

      alert("Testimonial deleted successfully.");

      await fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Unable to delete testimonial.");
    }
  };

  return (
    <div className="testimonials-manager">
      <div className="testimonials-header">
        <div>
          <h1>Testimonials</h1>

          <p>
            Manage client testimonials displayed on your website.
          </p>
        </div>

        <button
          className="testimonial-add-btn"
          onClick={() => {
            setEditingId(null);

            setForm({
              name: "",
              designation: "",
              company: "",
              quote: "",
              imageUrl: "",
              status: "published",
            });

            setShowForm(true);
          }}
        >
          + Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="testimonial-form-card">
          <h2>
            {editingId
              ? "Edit Testimonial"
              : "Add Testimonial"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="testimonial-form-grid">
              <div className="testimonial-field">
                <label>Client Name *</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Example: Ravi Kumar"
                />
              </div>

              <div className="testimonial-field">
                <label>Designation</label>

                <input
                  type="text"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="Example: Founder & CEO"
                />
              </div>

              <div className="testimonial-field">
                <label>Company</label>

                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Example: ABC Events"
                />
              </div>

              <div className="testimonial-field">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="testimonial-field testimonial-full">
              <label>Testimonial *</label>

              <textarea
                name="quote"
                value={form.quote}
                onChange={handleChange}
                placeholder="Enter client testimonial..."
                rows="6"
              />
            </div>

            <div className="testimonial-field testimonial-full">
              <label>Client Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {uploading && (
                <div className="testimonial-upload-status">
                  Uploading client image...
                </div>
              )}
            </div>

            {form.imageUrl && !uploading && (
              <div className="testimonial-image-preview">
                <img
                  src={form.imageUrl}
                  alt="Client preview"
                />

                <span>
                  Client image uploaded successfully
                </span>
              </div>
            )}

            <div className="testimonial-form-actions">
              <button
                type="submit"
                className="testimonial-save-btn"
                disabled={saving || uploading}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Testimonial"
                  : "Save Testimonial"}
              </button>

              <button
                type="button"
                className="testimonial-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="testimonials-table-card">
        {loading ? (
          <div className="testimonial-state">
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="testimonial-state">
            <h3>No Testimonials</h3>

            <p>
              Add your first client testimonial.
            </p>
          </div>
        ) : (
          <div className="testimonials-table-wrapper">
            <table className="testimonials-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Designation</th>
                  <th>Company</th>
                  <th>Testimonial</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td>
                      <div className="testimonial-client">
                        {testimonial.imageUrl ? (
                          <img
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                          />
                        ) : (
                          <div className="testimonial-avatar">
                            {testimonial.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>
                        )}

                        <strong>
                          {testimonial.name}
                        </strong>
                      </div>
                    </td>

                    <td>
                      {testimonial.designation || "—"}
                    </td>

                    <td>
                      {testimonial.company || "—"}
                    </td>

                    <td>
                      <div className="testimonial-quote-preview">
                        {testimonial.quote}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`testimonial-status ${
                          testimonial.status ===
                          "published"
                            ? "published"
                            : "draft"
                        }`}
                      >
                        {testimonial.status}
                      </span>
                    </td>

                    <td>
                      <div className="testimonial-actions">
                        <button
                          className="testimonial-edit-btn"
                          onClick={() =>
                            handleEdit(testimonial)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="testimonial-delete-btn"
                          onClick={() =>
                            handleDelete(testimonial.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestimonialsManager;