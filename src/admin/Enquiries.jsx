import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import {
  Mail,
  Phone,
  Trash2,
  CalendarDays,
  User,
  MapPin,
} from "lucide-react";
import { db } from "../firebase/config";
import "./Enquiries.css";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const q = query(
        collection(db, "enquiries"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setEnquiries(data);
    } catch (error) {
      console.error("Error loading enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const deleteEnquiry = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "enquiries", id));

      setEnquiries((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      alert("Unable to delete enquiry.");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";

    const date = timestamp.toDate();

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="enquiries-page">

      <div className="enquiries-header">

        <div>
          <span className="admin-page-label">
            CONTACT
          </span>

          <h1>Enquiries</h1>

          <p>
            View enquiries submitted through the website.
          </p>
        </div>

        <div className="enquiries-count">
          <strong>{enquiries.length}</strong>
          <span>Total</span>
        </div>

      </div>

      {loading ? (
        <div className="enquiries-state">
          Loading enquiries...
        </div>
      ) : enquiries.length === 0 ? (
        <div className="enquiries-state">
          <Mail size={40} />

          <h2>No enquiries yet</h2>

          <p>
            Website enquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="enquiries-list">

          {enquiries.map((item) => (
            <article
              className="enquiry-card"
              key={item.id}
            >

              <div className="enquiry-card-header">

                <div className="enquiry-person">

                  <div className="enquiry-avatar">
                    {item.name
                      ?.charAt(0)
                      ?.toUpperCase() || "?"}
                  </div>

                  <div>
                    <h2>{item.name}</h2>

                    <span>
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                </div>

                <button
                  type="button"
                  className="enquiry-delete"
                  onClick={() =>
                    deleteEnquiry(item.id)
                  }
                  aria-label="Delete enquiry"
                >
                  <Trash2 size={18} />
                </button>

              </div>

              <div className="enquiry-details">

                <a
                  href={`tel:${item.phone}`}
                  className="enquiry-detail"
                >
                  <Phone size={17} />
                  <span>{item.phone}</span>
                </a>

                <a
                  href={`mailto:${item.email}`}
                  className="enquiry-detail"
                >
                  <Mail size={17} />
                  <span>{item.email}</span>
                </a>

                {item.eventType && (
                  <div className="enquiry-detail">
                    <MapPin size={17} />
                    <span>{item.eventType}</span>
                  </div>
                )}

                {item.eventDate && (
                  <div className="enquiry-detail">
                    <CalendarDays size={17} />
                    <span>{item.eventDate}</span>
                  </div>
                )}

              </div>

              <div className="enquiry-message">
                <span>MESSAGE</span>
                <p>{item.message}</p>
              </div>

            </article>
          ))}

        </div>
      )}

    </div>
  );
}

export default Enquiries;