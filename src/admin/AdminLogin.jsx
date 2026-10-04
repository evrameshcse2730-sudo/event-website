import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/config";

import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/admin");
    } catch (error) {
      console.error(error);

      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">

      <div className="admin-login__card">

        <div className="admin-login__header">
          <span>EVENT.</span>

          <h1>Admin Login</h1>

          <p>
            Sign in to manage your website.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="admin-login__field">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="admin-login__field">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="admin-login__error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;