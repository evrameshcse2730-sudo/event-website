
import { useState } from "react";
import { ImagePlus, UploadCloud, X } from "lucide-react";
import "./EventForm.css";

const CLOUD_NAME = "db4faz2rs";
const UPLOAD_PRESET = "event_website_uploads";

function EventForm({ event, onSave, onCancel }) {
  const initialCover =
    event?.imageUrl || event?.image || event?.coverImage || "";

  const [form, setForm] = useState({
    title: event?.title || "",
    type: event?.type || "Corporate Event",
    date: event?.date || "",
    location: event?.location || "",
    status: event?.status || "upcoming",
    publishStatus: event?.publishStatus || "draft",
    description: event?.description || "",
    imageUrl: initialCover,
    imageUrls: Array.isArray(event?.imageUrls)
      ? [...new Set([
          ...(initialCover ? [initialCover] : []),
          ...event.imageUrls,
        ])]
      : initialCover
        ? [initialCover]
        : [],
  });

  const [uploading, setUploading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const uploadImages = async (files, isCover = false) => {
    const selected = Array.from(files || []);
    if (!selected.length) return;

    const invalid = selected.find(
      (file) =>
        !file.type.startsWith("image/") ||
        file.size > 10 * 1024 * 1024
    );

    if (invalid) {
      alert("Select image files below 10MB each.");
      return;
    }

    if (isCover) setUploadingCover(true);
    else setUploading(true);

    try {
      const uploadedUrls = [];

      for (const file of selected) {
        const body = new FormData();
        body.append("file", file);
        body.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error?.message || "Image upload failed."
          );
        }

        uploadedUrls.push(result.secure_url);
      }

      setForm((current) => {
        if (isCover) {
          const oldCover = current.imageUrl;
          const imageUrls = current.imageUrls.filter(
            (url) => url !== oldCover
          );

          return {
            ...current,
            imageUrl: uploadedUrls[0],
            imageUrls: [
              uploadedUrls[0],
              ...imageUrls.filter((url) => url !== uploadedUrls[0]),
            ],
          };
        }

        return {
          ...current,
          imageUrls: [
            ...new Set([...current.imageUrls, ...uploadedUrls]),
          ],
          imageUrl: current.imageUrl || uploadedUrls[0],
        };
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert(`Image upload failed: ${error.message}`);
    } finally {
      if (isCover) setUploadingCover(false);
      else setUploading(false);
    }
  };

  const removeGalleryImage = (url) => {
    setForm((current) => {
      const imageUrls = current.imageUrls.filter(
        (item) => item !== url
      );

      return {
        ...current,
        imageUrls,
        imageUrl:
          current.imageUrl === url
            ? imageUrls[0] || ""
            : current.imageUrl,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.date ||
      !form.location.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (uploading || uploadingCover) {
      alert("Please wait until image uploads finish.");
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      location: form.location.trim(),
      imageUrl: form.imageUrl || form.imageUrls[0] || "",
      imageUrls: form.imageUrls,
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="event-form__grid">
        <div className="event-form__field event-form__field--full">
          <label>EVENT TITLE *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Example: Business Summit 2026"
            required
          />
        </div>

        <div className="event-form__field">
          <label>EVENT TYPE</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option>Corporate Event</option>
            <option>Wedding</option>
            <option>Conference</option>
            <option>Product Launch</option>
            <option>Cultural Event</option>
          </select>
        </div>

        <div className="event-form__field">
          <label>DATE *</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="event-form__field">
          <label>LOCATION *</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Hyderabad"
            required
          />
        </div>

        <div className="event-form__field">
          <label>EVENT STATUS</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="event-form__field">
          <label>PUBLISH STATUS</label>
          <select
            name="publishStatus"
            value={form.publishStatus}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="event-form__field event-form__field--full">
          <label>DESCRIPTION</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            placeholder="Describe this event..."
          />
        </div>

        <div className="event-form__field event-form__field--full">
          <label>MAIN COVER IMAGE</label>
          <p>Used as the main event banner.</p>

          <label className="event-image-upload">
            <UploadCloud size={20} />
            {uploadingCover ? "Uploading cover..." : "Choose cover image"}
            <input
              type="file"
              accept="image/*"
              hidden
              disabled={uploadingCover}
              onChange={(e) => {
                uploadImages(e.target.files, true);
                e.target.value = "";
              }}
            />
          </label>

          {form.imageUrl && (
            <div className="event-image-preview event-image-preview--cover">
              <img src={form.imageUrl} alt="Event cover preview" />
              <button
                type="button"
                onClick={() => removeGalleryImage(form.imageUrl)}
                aria-label="Remove cover image"
              >
                <X size={16} />
              </button>
              <span className="event-image-cover-tag">COVER</span>
            </div>
          )}
        </div>

        <div className="event-form__field event-form__field--full">
          <label>EVENT GALLERY IMAGES</label>
          <p>Choose multiple images. Maximum 10MB per image.</p>

          <label className="event-image-upload">
            <ImagePlus size={20} />
            {uploading ? "Uploading images..." : "Choose multiple images"}
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              disabled={uploading}
              onChange={(e) => {
                uploadImages(e.target.files);
                e.target.value = "";
              }}
            />
          </label>

          <div className="event-gallery-previews">
            {form.imageUrls.map((url, index) => (
              <div className="event-image-preview" key={url}>
                <img
                  src={url}
                  alt={`${form.title || "Event"} gallery ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(url)}
                  aria-label={`Remove image ${index + 1}`}
                >
                  <X size={16} />
                </button>
                {url === form.imageUrl && (
                  <span className="event-image-cover-tag">COVER</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="event-form__actions">
        <button
          type="button"
          className="event-form__cancel"
          onClick={onCancel}
          disabled={uploading || uploadingCover}
        >
          CANCEL
        </button>

        <button
          type="submit"
          className="event-form__submit"
          disabled={uploading || uploadingCover}
        >
          {uploading || uploadingCover
            ? "UPLOADING..."
            : event
              ? "UPDATE EVENT"
              : "CREATE EVENT"}
        </button>
      </div>
    </form>
  );
}

export default EventForm;
