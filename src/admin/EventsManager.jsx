
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  MapPin,
  CalendarDays,
  X,
  ImagePlus,
} from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";
import EventForm from "./EventForm";
import "./EventsManager.css";

function EventsManager() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(collection(db, "events"));

      const loadedEvents = snapshot.docs.map((item) => {
        const data = item.data();

        let eventDate = "";

        if (typeof data.date === "string") {
          eventDate = data.date;
        } else if (data.date?.toDate) {
          const date = data.date.toDate();

          eventDate = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
          ].join("-");
        }

        const imageUrl =
          data.imageUrl || data.image || data.coverImage || "";

        return {
          id: item.id,
          title: data.title || "",
          type: data.type || data.eventType || "Corporate Event",
          date: eventDate,
          location: data.location || "",
          status: data.status || "upcoming",
          publishStatus:
            data.publishStatus ||
            (data.status === "published" ? "published" : "draft"),
          description: data.description || "",
          slug: data.slug || "",
          imageUrl,
          imageUrls: Array.isArray(data.imageUrls)
            ? [...new Set([
                ...(imageUrl ? [imageUrl] : []),
                ...data.imageUrls,
              ])]
            : imageUrl
              ? [imageUrl]
              : [],
        };
      });

      setEvents(loadedEvents);
    } catch (error) {
      console.error("Error loading events:", error);
      alert("Events load avvaledu. Firebase permissions check cheyyandi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const term = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(term) ||
      event.type.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term);

    const matchesFilter =
      filter === "all" || event.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handleAdd = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleSave = async (eventData) => {
    if (saving) return;

    setSaving(true);

    try {
      const title = eventData.title.trim();
      const slug =
        eventData.slug ||
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const imageUrl =
        eventData.imageUrl || eventData.imageUrls?.[0] || "";

      const eventToSave = {
        title,
        type: eventData.type,
        date: eventData.date,
        location: eventData.location.trim(),
        status: eventData.status,
        publishStatus: eventData.publishStatus,
        description: eventData.description || "",
        slug,
        imageUrl,
        imageUrls: [
          ...new Set([
            ...(imageUrl ? [imageUrl] : []),
            ...(Array.isArray(eventData.imageUrls)
              ? eventData.imageUrls
              : []),
          ]),
        ],
        updatedAt: serverTimestamp(),
      };

      if (editingEvent) {
        await updateDoc(
          doc(db, "events", editingEvent.id),
          eventToSave
        );
      } else {
        await addDoc(collection(db, "events"), {
          ...eventToSave,
          createdAt: serverTimestamp(),
        });
      }

      await loadEvents();
      setShowForm(false);
      setEditingEvent(null);
      alert("Event saved successfully!");
    } catch (error) {
      console.error("Error saving event:", error);
      alert(
        `Event save avvaledu: ${error.message}. Firebase rules and permissions check cheyyandi.`
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "events", id));
      setEvents((current) =>
        current.filter((event) => event.id !== id)
      );
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Event delete avvaledu. Firebase rules check cheyyandi.");
    }
  };

  return (
    <div className="events-manager">
      <div className="events-manager__header">
        <div>
          <span className="events-manager__label">
            CONTENT MANAGEMENT
          </span>
          <h1>EVENTS</h1>
          <p>
            Add, edit and manage all events displayed on your website.
          </p>
        </div>

        <button
          type="button"
          className="events-manager__add"
          onClick={handleAdd}
        >
          <Plus size={18} />
          ADD EVENT
        </button>
      </div>

      <div className="events-manager__toolbar">
        <div className="events-manager__search">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="events-manager__filters">
          {["all", "upcoming", "completed"].map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item === "all"
                ? "All"
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="events-manager__list">
        {loading ? (
          <div className="events-manager__empty">
            <p>Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="events-manager__empty">
            <CalendarDays size={35} />
            <h3>No events found</h3>
            <p>Try changing your search or add a new event.</p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const eventDate = event.date
              ? new Date(`${event.date}T12:00:00`)
              : null;

            return (
              <div className="admin-event-row" key={event.id}>
                <div className="admin-event-row__date">
                  <strong>
                    {eventDate && !Number.isNaN(eventDate.getTime())
                      ? eventDate.getDate()
                      : "--"}
                  </strong>
                  <span>
                    {eventDate && !Number.isNaN(eventDate.getTime())
                      ? eventDate
                          .toLocaleString("en-US", { month: "short" })
                          .toUpperCase()
                      : "---"}
                  </span>
                </div>

                <div className="admin-event-row__info">
                  <div className="admin-event-row__title">
                    <h3>{event.title}</h3>
                    <span>{event.type}</span>
                  </div>

                  <div className="admin-event-row__meta">
                    <span>
                      <MapPin size={14} />
                      {event.location}
                    </span>
                    <span className={`admin-event-status ${event.status}`}>
                      {event.status}
                    </span>
                    <span
                      className={`admin-event-publish ${event.publishStatus}`}
                    >
                      {event.publishStatus}
                    </span>
                    <span>
                      <ImagePlus size={14} />
                      {event.imageUrls.length} images
                    </span>
                  </div>
                </div>

                <div className="admin-event-row__actions">
                  <button
                    type="button"
                    title="Preview"
                    onClick={() =>
                      window.open(
                        `/events/${event.slug || event.id}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    type="button"
                    title="Edit"
                    onClick={() => handleEdit(event)}
                  >
                    <Edit3 size={17} />
                  </button>

                  <button
                    type="button"
                    className="delete"
                    title="Delete"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showForm && (
        <div className="event-form-overlay">
          <div className="event-form-modal">
            <div className="event-form-modal__header">
              <div>
                <span>EVENT MANAGEMENT</span>
                <h2>{editingEvent ? "EDIT EVENT" : "ADD NEW EVENT"}</h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                aria-label="Close event form"
              >
                <X size={20} />
              </button>
            </div>

            <EventForm
              key={editingEvent?.id || "new-event"}
              event={editingEvent}
              onSave={handleSave}
              onCancel={closeForm}
            />

            {saving && (
              <p style={{ textAlign: "center", padding: "12px" }}>
                Saving event...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsManager;
