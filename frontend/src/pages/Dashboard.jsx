
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAuthorized(true);

        const response = await API.get(
          `/jobs?page=${page}&limit=5&search=${encodeURIComponent(search)}&status=${status === "All" ? "" : status}&sort=${sort}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setJobs(response.data.jobs || []);
        setTotalPages(response.data.totalPages || 1);

      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          setError(
            err.response?.data?.message || "Jobs load nahi ho paayi."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate, search, status, sort, page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );

      alert("Job deleted successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message || "Job delete failed"
      );
    }
  };

  const totalApplications = jobs.length;

  const applied = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interview = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const selected = jobs.filter(
    (job) => job.status === "Selected"
  ).length;

  const rejected = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

if (loading) {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <h3>Loading Dashboard...</h3>
      <p>Please wait while we fetch your jobs...</p>
    </div>
  );
}if (loading) {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <h3>Loading Dashboard...</h3>
      <p>Please wait while we fetch your jobs...</p>
    </div>
  );
}
  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Job Application Tracker
      </h1>

      <h2>Dashboard</h2>

      {/* Search, Filter and Sort */}
      <div className="dashboard-controls">

        <input
          className="search-input"
          type="text"
          placeholder="Search by company or position..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="filter-select"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All Jobs</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          className="filter-select"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="company">Company A-Z</option>
        </select>

      </div>

      <button
        className="dashboard-button"
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Statistics */}
      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{totalApplications}</p>
        </div>

        <div className="stat-card">
          <h3>Applied</h3>
          <p>{applied}</p>
        </div>

        <div className="stat-card">
          <h3>Interview</h3>
          <p>{interview}</p>
        </div>

        <div className="stat-card">
          <h3>Selected</h3>
          <p>{selected}</p>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <p>{rejected}</p>
        </div>

      </div>

      <button
        className="dashboard-button"
        onClick={() => navigate("/add-job")}
      >
        Add New Job
      </button>

      <h3>My Job Applications</h3>

      {/* Pagination */}
      <div className="pagination">

        <button
          className="dashboard-button"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="dashboard-button"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>

      </div>

      {/* Job Cards */}
     {jobs.length === 0 ? (
  <div className="empty-state">
    <div className="empty-icon">📂</div>
    <h2>No Jobs Found</h2>
    <p>
      You haven't added any job applications yet.
      Start tracking your job applications today!
    </p>

    <button
      className="dashboard-button"
      onClick={() => navigate("/add-job")}
    >
      + Add Your First Job
    </button>
  </div>
) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="job-card"
          >

            <h4>{job.company}</h4>
            <p>Position: {job.position}</p>
            <p>Location: {job.location || "Not specified"}</p>
            <p>Status: {job.status}</p>

            <button
              className="dashboard-button"
              onClick={() => navigate(`/edit-job/${job._id}`)}
            >
              Edit Job
            </button>

            <button
              className="dashboard-button"
              onClick={() => handleDeleteJob(job._id)}
            >
              Delete Job
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;
