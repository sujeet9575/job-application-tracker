
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./AddJob.css";

function AddJob() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Applied");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        "/jobs",
        { company, position, location, status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(response.data.message || "Job added successfully!");

      setCompany("");
      setPosition("");
      setLocation("");
      setStatus("Applied");

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="add-job-page">
      <div className="add-job-card">
        <div className="add-job-icon">💼</div>

        <h1>Add New Job</h1>
        <p className="add-job-subtitle">
          Keep track of your job applications
        </p>

        <form onSubmit={handleSubmit}>
          <div className="add-job-field">
            <label>Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="add-job-field">
            <label>Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter job position"
              required
            />
          </div>

          <div className="add-job-field">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter job location"
            />
          </div>

          <div className="add-job-field">
            <label>Application Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button type="submit" className="add-job-submit">
            Add Job
          </button>
        </form>

        {message && <p className="add-job-success">{message}</p>}
        {error && <p className="add-job-error">{error}</p>}

        <button
          className="back-dashboard"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AddJob;
