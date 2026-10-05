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
import "./GalleryManager.css";

const CLOUD_NAME = "db4faz2rs";
const UPLOAD_PRESET = "event_website_uploads";

function GalleryManager() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    event: "",
    category: "",
    imageUrl: "",
    status: "published",
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "gallery"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setGallery(data);
    } catch (error) {
      console.error("Error loading gallery:", error);
      alert("Unable to load gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
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
        console.error(data);
        throw new Error(data.error?.message || "Upload failed.");
      }

      setForm((prev) => ({
        ...prev,
        imageUrl: data.secure_url,
      }));

      alert("Image uploaded successfully.");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      event: "",
      category: "",
      imageUrl: "",
      status: "published",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter gallery title.");
      return;
    }

    if (!form.imageUrl) {
      alert("Please upload an image.");
      return;
    }

    try {
      setSaving(true);

      const galleryData = {
        title: form.title.trim(),
        event: form.event.trim(),
        category: form.category.trim(),
        imageUrl: form.imageUrl,
        status: form.status,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(
          doc(db, "gallery", editingId),
          galleryData
        );

        alert("Gallery item updated successfully.");
      } else {
        await addDoc(collection(db, "gallery"), {
          ...galleryData,
          createdAt: serverTimestamp(),
        });

        alert("Gallery item added successfully.");
      }

      resetForm();
      await fetchGallery();
    } catch (error) {
      console.error("Error saving gallery:", error);
      alert("Unable to save gallery item.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      title: item.title || "",
      event: item.event || "",
      category: item.category || "",
      imageUrl: item.imageUrl || "",
      status: item.status || "published",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "gallery", id));

      alert("Gallery item deleted successfully.");

      await fetchGallery();
    } catch (error) {
      console.error("Error deleting gallery:", error);
      alert("Unable to delete gallery item.");
    }
  };

  return (
    <div className="gallery-manager">
      <div className="gallery-header">
        <div>
          <h1>Gallery</h1>
          <p>
            Upload and manage images displayed on your website.
          </p>
        </div>

        <button
          className="gallery-add-btn"
          onClick={() => {
            setEditingId(null);

            setForm({
              title: "",
              event: "",
              category: "",
              imageUrl: "",
              status: "published",
            });

            setShowForm(true);
          }}
        >
          + Add Gallery Image
        </button>
      </div>

      {showForm && (
        <div className="gallery-form-card">
          <h2>
            {editingId
              ? "Edit Gallery Image"
              : "Add Gallery Image"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="gallery-form-grid">
              <div className="gallery-field">
                <label>Title</label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Business Summit"
                />
              </div>

              <div className="gallery-field">
                <label>Event</label>

                <input
                  type="text"
                  name="event"
                  value={form.event}
                  onChange={handleChange}
                  placeholder="Example: Business Summit 2026"
                />
              </div>

              <div className="gallery-field">
                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Corporate"
                />
              </div>

              <div className="gallery-field">
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

            <div className="gallery-upload-section">
              <label>Gallery Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {uploading && (
                <div className="gallery-upload-status">
                  Uploading image...
                </div>
              )}

              {form.imageUrl && !uploading && (
                <div className="gallery-preview">
                  <img
                    src={form.imageUrl}
                    alt="Gallery preview"
                  />

                  <span>Image uploaded successfully</span>
                </div>
              )}
            </div>

            <div className="gallery-form-actions">
              <button
                type="submit"
                className="gallery-save-btn"
                disabled={saving || uploading}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Gallery"
                  : "Save Gallery"}
              </button>

              <button
                type="button"
                className="gallery-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="gallery-table-card">
        {loading ? (
          <div className="gallery-state">
            Loading gallery...
          </div>
        ) : gallery.length === 0 ? (
          <div className="gallery-state">
            <h3>No Gallery Images</h3>
            <p>
              Add your first gallery image using the button above.
            </p>
          </div>
        ) : (
          <div className="gallery-table-wrapper">
            <table className="gallery-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Event</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {gallery.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        className="gallery-thumbnail"
                        src={item.imageUrl}
                        alt={item.title}
                      />
                    </td>

                    <td>
                      <strong>{item.title}</strong>
                    </td>

                    <td>{item.event || "—"}</td>

                    <td>{item.category || "—"}</td>

                    <td>
                      <span
                        className={`gallery-status ${
                          item.status === "published"
                            ? "published"
                            : "draft"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="gallery-actions">
                        <button
                          className="gallery-edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="gallery-delete-btn"
                          onClick={() =>
                            handleDelete(item.id)
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

export default GalleryManager;