import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ImagePlus, UploadCloud, X } from "lucide-react";
import { db } from "../firebase/config";
import "./EventTypesManager.css";

const CLOUD_NAME = "db4faz2rs";
const UPLOAD_PRESET = "event_website_uploads";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  imageUrl: "",
  status: "published",
};

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px 14px",
  border: "1px solid #d9e0dd",
  borderRadius: "8px",
  outline: "none",
  background: "#fff",
  color: "#10201d",
  boxSizing: "border-box",
};

const thStyle = {
  textAlign: "left",
  padding: "15px",
  fontSize: "13px",
  color: "#5f6d68",
  borderBottom: "1px solid #e4e8e6",
};

const tdStyle = {
  padding: "16px 15px",
  borderBottom: "1px solid #edf0ef",
  fontSize: "14px",
  color: "#26332f",
};

const actionButton = {
  border: "none",
  background: "#edf5f2",
  color: "#0f5c4d",
  padding: "7px 12px",
  borderRadius: "7px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

function makeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function EventTypesManager() {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchEventTypes = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(
        query(collection(db, "eventTypes"), orderBy("createdAt", "desc"))
      );
      setEventTypes(
        snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
      );
    } catch (error) {
      console.error("Error loading event types:", error);
      alert("Unable to load event types.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((current) => ({
      ...current,
      title,
      slug: editingId ? current.slug : makeSlug(title),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleCoverUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("Please select an image smaller than 10MB.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "Image upload failed.");
      }

      setForm((current) => ({ ...current, imageUrl: result.secure_url }));
    } catch (error) {
      console.error("Cloudinary cover upload error:", error);
      alert(`Cover image upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Please enter event type name.");
      return;
    }
    if (!form.description.trim()) {
      alert("Please enter description.");
      return;
    }
    if (uploading) {
      alert("Please wait until the image upload finishes.");
      return;
    }

    try {
      setSaving(true);
      const eventTypeData = {
        title: form.title.trim(),
        slug: form.slug.trim() || makeSlug(form.title),
        description: form.description.trim(),
        imageUrl: form.imageUrl || "",
        status: form.status,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, "eventTypes", editingId), eventTypeData);
        alert("Event type updated successfully.");
      } else {
        await addDoc(collection(db, "eventTypes"), {
          ...eventTypeData,
          createdAt: serverTimestamp(),
        });
        alert("Event type added successfully.");
      }

      resetForm();
      await fetchEventTypes();
    } catch (error) {
      console.error("Error saving event type:", error);
      alert(`Unable to save event type: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (eventType) => {
    setEditingId(eventType.id);
    setForm({
      title: eventType.title || "",
      slug: eventType.slug || "",
      description: eventType.description || "",
      imageUrl: eventType.imageUrl || eventType.image || eventType.coverImage || "",
      status: eventType.status || "published",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event type?")) return;
    try {
      await deleteDoc(doc(db, "eventTypes", id));
      setEventTypes((current) => current.filter((item) => item.id !== id));
      alert("Event type deleted successfully.");
    } catch (error) {
      console.error("Error deleting event type:", error);
      alert("Unable to delete event type.");
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  return (
    <div className="admin-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "32px", color: "#10201d" }}>
            Event Types
          </h1>
          <p style={{ marginTop: "8px", color: "#6b7773" }}>
            Manage the different types of events shown on your website.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          style={{
            background: "#0f5c4d",
            color: "#fff",
            padding: "13px 20px",
            borderRadius: "10px",
            fontWeight: "600",
            border: 0,
            cursor: "pointer",
          }}
        >
          + Add Event Type
        </button>
      </div>

      {showForm && (
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "30px",
            border: "1px solid #e4e8e6",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#10201d" }}>
            {editingId ? "Edit Event Type" : "Add Event Type"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "18px",
              }}
            >
              <div>
                <label htmlFor="event-type-title">Event Type Name</label>
                <input
                  id="event-type-title"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Example: Corporate Events"
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="event-type-slug">Slug</label>
                <input
                  id="event-type-slug"
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="corporate-events"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: "18px" }}>
              <label htmlFor="event-type-description">Description</label>
              <textarea
                id="event-type-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter event type description..."
                rows="4"
                required
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            <div style={{ marginTop: "18px" }}>
              <label>Cover Image</label>
              <p style={{ margin: "8px 0 12px", color: "#6b7773", fontSize: "13px" }}>
                Upload an image up to 10MB. This image appears on the public Event Types card.
              </p>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  border: "1px dashed #0f5c4d",
                  borderRadius: "8px",
                  color: "#0f5c4d",
                  cursor: uploading ? "wait" : "pointer",
                  opacity: uploading ? 0.6 : 1,
                }}
              >
                <UploadCloud size={19} />
                {uploading ? "Uploading cover image..." : "Choose cover image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={uploading}
                  onChange={(e) => {
                    handleCoverUpload(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </label>

              {form.imageUrl && (
                <div
                  style={{
                    position: "relative",
                    width: "min(100%, 360px)",
                    marginTop: "16px",
                  }}
                >
                  <img
                    src={form.imageUrl}
                    alt="Event type cover preview"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, imageUrl: "" }))}
                    aria-label="Remove cover image"
                    title="Remove cover image"
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      display: "grid",
                      placeItems: "center",
                      width: "32px",
                      height: "32px",
                      border: 0,
                      borderRadius: "50%",
                      background: "#fff",
                      color: "#b42318",
                      cursor: "pointer",
                    }}
                  >
                    <X size={17} />
                  </button>
                </div>
              )}
            </div>

            <div style={{ marginTop: "18px" }}>
              <label htmlFor="event-type-status">Status</label>
              <select
                id="event-type-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "22px", flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={saving || uploading}
                style={{
                  background: "#0f5c4d",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  border: 0,
                  cursor: "pointer",
                  opacity: saving || uploading ? 0.6 : 1,
                }}
              >
                {uploading ? "Uploading..." : saving ? "Saving..." : editingId ? "Update Event Type" : "Save Event Type"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={saving || uploading}
                style={{
                  background: "#e9eeec",
                  color: "#10201d",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  border: 0,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e4e8e6", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "50px", textAlign: "center", color: "#6b7773" }}>
            Loading event types...
          </div>
        ) : eventTypes.length === 0 ? (
          <div style={{ padding: "50px", textAlign: "center", color: "#6b7773" }}>
            <h3>No Event Types Found</h3>
            <p>Click "Add Event Type" to create your first event type.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f5f7f6" }}>
                  <th style={thStyle}>Cover</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Slug</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {eventTypes.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>
                      {item.imageUrl || item.image || item.coverImage ? (
                        <img
                          src={item.imageUrl || item.image || item.coverImage}
                          alt=""
                          style={{ width: "68px", height: "48px", objectFit: "cover", borderRadius: "6px" }}
                        />
                      ) : (
                        <ImagePlus size={22} color="#8a9691" />
                      )}
                    </td>
                    <td style={tdStyle}><strong>{item.title}</strong></td>
                    <td style={tdStyle}>{item.slug}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: item.status === "published" ? "#e2f4ee" : "#f1f1f1",
                          color: item.status === "published" ? "#0f5c4d" : "#777",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button type="button" onClick={() => handleEdit(item)} style={actionButton}>Edit</button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          style={{ ...actionButton, background: "#fff0f0", color: "#b42318" }}
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

export default EventTypesManager;
