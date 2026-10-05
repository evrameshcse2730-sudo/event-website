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
import { db } from "../firebase/config";
import "./EventTypesManager.css";

function EventTypesManager() {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    status: "published",
  });

  const fetchEventTypes = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "eventTypes"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setEventTypes(data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;

    setForm((prev) => ({
      ...prev,
      title,
      slug: editingId ? prev.slug : generateSlug(title),
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      description: "",
      status: "published",
    });

    setEditingId(null);
    setShowForm(false);
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

    try {
      setSaving(true);

      const eventTypeData = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        status: form.status,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        const eventTypeRef = doc(db, "eventTypes", editingId);

        await updateDoc(eventTypeRef, eventTypeData);

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
      alert("Something went wrong while saving.");
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
      status: eventType.status || "published",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event type?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "eventTypes", id));

      alert("Event type deleted successfully.");

      await fetchEventTypes();
    } catch (error) {
      console.error("Error deleting event type:", error);
      alert("Unable to delete event type.");
    }
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
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              color: "#10201d",
            }}
          >
            Event Types
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#6b7773",
            }}
          >
            Manage the different types of events shown on your website.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({
              title: "",
              slug: "",
              description: "",
              status: "published",
            });
            setShowForm(true);
          }}
          style={{
            background: "#0f5c4d",
            color: "#fff",
            padding: "13px 20px",
            borderRadius: "10px",
            fontWeight: "600",
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
          <h2
            style={{
              marginBottom: "20px",
              color: "#10201d",
            }}
          >
            {editingId ? "Edit Event Type" : "Add Event Type"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
              }}
            >
              <div>
                <label>Event Type Name</label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Example: Corporate Events"
                  style={inputStyle}
                />
              </div>

              <div>
                <label>Slug</label>

                <input
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
              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter event type description..."
                rows="5"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ marginTop: "18px" }}>
              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "22px",
              }}
            >
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: "#0f5c4d",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Event Type"
                  : "Save Event Type"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: "#e9eeec",
                  color: "#10201d",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #e4e8e6",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div
            style={{
              padding: "50px",
              textAlign: "center",
              color: "#6b7773",
            }}
          >
            Loading event types...
          </div>
        ) : eventTypes.length === 0 ? (
          <div
            style={{
              padding: "50px",
              textAlign: "center",
              color: "#6b7773",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>
              No Event Types Found
            </h3>

            <p>
              Click "Add Event Type" to create your first event type.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#f5f7f6" }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Slug</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {eventTypes.map((eventType) => (
                  <tr key={eventType.id}>
                    <td style={tdStyle}>
                      <strong>{eventType.title}</strong>
                    </td>

                    <td style={tdStyle}>
                      {eventType.slug}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background:
                            eventType.status === "published"
                              ? "#e2f4ee"
                              : "#f1f1f1",
                          color:
                            eventType.status === "published"
                              ? "#0f5c4d"
                              : "#777",
                        }}
                      >
                        {eventType.status}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={() => handleEdit(eventType)}
                          style={actionButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(eventType.id)
                          }
                          style={{
                            ...actionButton,
                            background: "#fff0f0",
                            color: "#b42318",
                          }}
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

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px 14px",
  border: "1px solid #d9e0dd",
  borderRadius: "8px",
  outline: "none",
  background: "#fff",
  color: "#10201d",
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

export default EventTypesManager;