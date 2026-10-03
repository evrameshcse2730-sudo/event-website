import { useState } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  MapPin,
  CalendarDays,
  X,
} from "lucide-react";

import EventForm from "./EventForm";

import "./EventsManager.css";

const initialEvents = [
  {
    id: 1,
    title: "Business Summit 2026",
    type: "Corporate Event",
    date: "2026-10-18",
    location: "Hyderabad",
    status: "upcoming",
    publishStatus: "published",
  },
  {
    id: 2,
    title: "Wedding Celebration",
    type: "Wedding",
    date: "2026-10-25",
    location: "Vijayawada",
    status: "upcoming",
    publishStatus: "published",
  },
  {
    id: 3,
    title: "Brand Launch Experience",
    type: "Product Launch",
    date: "2026-11-08",
    location: "Bengaluru",
    status: "upcoming",
    publishStatus: "draft",
  },
  {
    id: 4,
    title: "Leadership Summit",
    type: "Conference",
    date: "2025-12-14",
    location: "Hyderabad",
    status: "completed",
    publishStatus: "published",
  },
];

function EventsManager() {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.type.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

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

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    setEvents((current) =>
      current.filter((event) => event.id !== id)
    );
  };

  const handleSave = (eventData) => {
    if (editingEvent) {
      setEvents((current) =>
        current.map((event) =>
          event.id === editingEvent.id
            ? {
                ...eventData,
                id: editingEvent.id,
              }
            : event
        )
      );
    } else {
      setEvents((current) => [
        {
          ...eventData,
          id: Date.now(),
        },
        ...current,
      ]);
    }

    setShowForm(false);
    setEditingEvent(null);
  };

  return (
    <div className="events-manager">

      {/* HEADER */}

      <div className="events-manager__header">

        <div>
          <span className="events-manager__label">
            CONTENT MANAGEMENT
          </span>

          <h1>
            EVENTS
          </h1>

          <p>
            Add, edit and manage all events displayed
            on your website.
          </p>
        </div>

        <button
          className="events-manager__add"
          onClick={handleAdd}
        >
          <Plus size={18} />
          ADD EVENT
        </button>

      </div>

      {/* TOOLBAR */}

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

          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "upcoming" ? "active" : ""}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

        </div>

      </div>

      {/* EVENTS */}

      <div className="events-manager__list">

        {filteredEvents.length === 0 ? (
          <div className="events-manager__empty">
            <CalendarDays size={35} />
            <h3>No events found</h3>
            <p>
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              className="admin-event-row"
              key={event.id}
            >

              {/* DATE */}

              <div className="admin-event-row__date">
                <strong>
                  {new Date(event.date).getDate()}
                </strong>

                <span>
                  {new Date(event.date)
                    .toLocaleString("en-US", {
                      month: "short",
                    })
                    .toUpperCase()}
                </span>
              </div>

              {/* INFO */}

              <div className="admin-event-row__info">

                <div className="admin-event-row__title">
                  <h3>{event.title}</h3>

                  <span>
                    {event.type}
                  </span>
                </div>

                <div className="admin-event-row__meta">

                  <span>
                    <MapPin size={14} />
                    {event.location}
                  </span>

                  <span
                    className={`admin-event-status ${
                      event.status
                    }`}
                  >
                    {event.status}
                  </span>

                  <span
                    className={`admin-event-publish ${
                      event.publishStatus
                    }`}
                  >
                    {event.publishStatus}
                  </span>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="admin-event-row__actions">

                <button
                  title="Preview"
                  onClick={() =>
                    alert(
                      `Preview: ${event.title}`
                    )
                  }
                >
                  <Eye size={17} />
                </button>

                <button
                  title="Edit"
                  onClick={() =>
                    handleEdit(event)
                  }
                >
                  <Edit3 size={17} />
                </button>

                <button
                  className="delete"
                  title="Delete"
                  onClick={() =>
                    handleDelete(event.id)
                  }
                >
                  <Trash2 size={17} />
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      {/* FORM MODAL */}

      {showForm && (
        <div className="event-form-overlay">

          <div className="event-form-modal">

            <div className="event-form-modal__header">

              <div>
                <span>
                  EVENT MANAGEMENT
                </span>

                <h2>
                  {editingEvent
                    ? "EDIT EVENT"
                    : "ADD NEW EVENT"}
                </h2>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingEvent(null);
                }}
              >
                <X size={20} />
              </button>

            </div>

            <EventForm
              event={editingEvent}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditingEvent(null);
              }}
            />

          </div>

        </div>
      )}

    </div>
  );
}

export default EventsManager;