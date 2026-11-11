
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./AddJob.css";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Applied");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get(`/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const job = response.data.job;

        setCompany(job.company);
        setPosition(job.position);
        setLocation(job.location || "");
        setStatus(job.status);

      } catch (err) {
        setError(
          err.response?.data?.message || "Job load nahi ho paayi."
        );
      }
    };

    fetchJob();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await API.put(
        `/jobs/${id}`,
        { company, position, location, status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(response.data.message || "Job updated successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.message || "Job update failed."
      );
    }
  };

  return (
    <div className="add-job-page">
      <div className="add-job-card">
        <div className="add-job-icon">✏️</div>

        <h1>Edit Job Application</h1>
        <p className="add-job-subtitle">
          Update your job application details
        </p>

        <form onSubmit={handleUpdate}>
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
            Update Job
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

export default EditJob;
