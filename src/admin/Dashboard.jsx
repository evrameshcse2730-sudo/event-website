import {
  CalendarDays,
  Images,
  MessageSquareQuote,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import "./Dashboard.css";

const stats = [
  {
    label: "TOTAL EVENTS",
    value: "24",
    icon: CalendarDays,
  },
  {
    label: "GALLERY ITEMS",
    value: "86",
    icon: Images,
  },
  {
    label: "TESTIMONIALS",
    value: "18",
    icon: MessageSquareQuote,
  },
  {
    label: "NEW ENQUIRIES",
    value: "12",
    icon: Mail,
  },
];

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard__header">

        <div>
          <span className="dashboard__label">
            OVERVIEW
          </span>

          <h1>
            GOOD MORNING,
            <br />
            <span>ADMIN.</span>
          </h1>
        </div>

        <p>
          Manage your event website, content and
          enquiries from one place.
        </p>

      </div>

      <div className="dashboard__stats">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="dashboard-stat"
              key={item.label}
            >
              <div className="dashboard-stat__top">
                <span>{item.label}</span>
                <Icon size={19} />
              </div>

              <strong>{item.value}</strong>

              <span className="dashboard-stat__bottom">
                Manage
                <ArrowUpRight size={14} />
              </span>
            </div>
          );
        })}

      </div>

      <div className="dashboard__grid">

        <section className="dashboard-panel">

          <div className="dashboard-panel__header">
            <div>
              <span>UPCOMING</span>
              <h2>Upcoming Events</h2>
            </div>

            <button>
              VIEW ALL
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="dashboard-event">

            <div className="dashboard-event__date">
              <strong>18</strong>
              <span>OCT</span>
            </div>

            <div>
              <h3>Business Summit 2026</h3>
              <p>Corporate Event · Hyderabad</p>
            </div>

          </div>

          <div className="dashboard-event">

            <div className="dashboard-event__date">
              <strong>25</strong>
              <span>OCT</span>
            </div>

            <div>
              <h3>Wedding Celebration</h3>
              <p>Wedding · Vijayawada</p>
            </div>

          </div>

          <div className="dashboard-event">

            <div className="dashboard-event__date">
              <strong>08</strong>
              <span>NOV</span>
            </div>

            <div>
              <h3>Brand Launch Experience</h3>
              <p>Product Launch · Bengaluru</p>
            </div>

          </div>

        </section>

        <section className="dashboard-panel dashboard-panel--dark">

          <span>QUICK ACTION</span>

          <h2>
            CREATE
            <br />
            SOMETHING
            <br />
            <em>NEW.</em>
          </h2>

          <p>
            Add a new event and publish it
            to your website.
          </p>

          <button className="dashboard-create-button">
            ADD NEW EVENT
            <ArrowUpRight size={17} />
          </button>

        </section>

      </div>

    </div>
  );
}

export default Dashboard;