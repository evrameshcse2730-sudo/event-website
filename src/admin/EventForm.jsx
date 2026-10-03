import { useState } from "react";

import "./EventForm.css";

function EventForm({ event, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: event?.title || "",
    type: event?.type || "Corporate Event",
    date: event?.date || "",
    location: event?.location || "",
    status: event?.status || "upcoming",
    publishStatus: event?.publishStatus || "draft",
    description: event?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.location) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(form);
  };

  return (
    <form
      className="event-form"
      onSubmit={handleSubmit}
    >

      <div className="event-form__grid">

        <div className="event-form__field event-form__field--full">
          <label>EVENT TITLE *</label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Example: Business Summit 2026"
          />
        </div>

        <div className="event-form__field">
          <label>EVENT TYPE</label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
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
          />
        </div>

        <div className="event-form__field">
          <label>EVENT STATUS</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="upcoming">
              Upcoming
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        <div className="event-form__field">
          <label>PUBLISH STATUS</label>

          <select
            name="publishStatus"
            value={form.publishStatus}
            onChange={handleChange}
          >
            <option value="draft">
              Draft
            </option>

            <option value="published">
              Published
            </option>
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

      </div>

      <div className="event-form__actions">

        <button
          type="button"
          className="event-form__cancel"
          onClick={onCancel}
        >
          CANCEL
        </button>

        <button
          type="submit"
          className="event-form__submit"
        >
          {event ? "UPDATE EVENT" : "CREATE EVENT"}
        </button>

      </div>

    </form>
  );
}

export default EventForm;