import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-bg"></div>

      <div className="not-found-content">
        <span className="not-found-label">
          ERROR 404
        </span>

        <div className="not-found-number">
          404
        </div>

        <h1>
          PAGE NOT
          <br />
          FOUND.
        </h1>

        <p>
          The page you are looking for doesn't exist
          or may have been moved.
        </p>

        <div className="not-found-actions">
          <Link
            to="/"
            className="not-found-primary"
          >
            <Home size={18} />
            <span>Back to Home</span>
          </Link>

          <button
            type="button"
            className="not-found-secondary"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;