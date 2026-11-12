
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Auth.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await API.put(
        `/auth/reset-password/${token}`,
        { newPassword }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">🔑</div>

        <h1>Job Tracker</h1>
        <p className="auth-subtitle">
          Create a new password for your account
        </p>

        <h2>Reset Password</h2>

        <form onSubmit={handleResetPassword}>
          <div className="auth-input-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p className="auth-success">{message}</p>
        )}

        {error && (
          <p className="auth-error">{error}</p>
        )}

        <p className="auth-footer">
          <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
