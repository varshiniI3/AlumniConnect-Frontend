import React, { useState ,useEffect} from "react";
import "./jobs.css";
import Navbar from '../home/Navbar';
import { FaSearch } from "react-icons/fa";


const Jobs = () => {
  const [filters, setFilters] = useState({
    status: [],
    location: [],
    experience: [],
    jobType: [],
    salaryRange: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [showFilterCategory, setShowFilterCategory] = useState({
    status: false,
    location: false,
    experience: false,
    jobType: false,
    salaryRange: false,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // const [jobs, setJobs] = useState([
  const jobs = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "TechCorp",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "Applied",
      experience: "Fresher",
      jobType: "Full Time",
      ctc: "6LPA",
      location: "Hyderabad",
      skills: ["React", "JavaScript", "CSS"],
      deadline: "2025-03-01",
    },
    {
      id: 2,
      role: "Backend Developer",
      company: "InnovateSoft",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "Not Applied",
      experience: "1-2 years",
      jobType: "Internship",
      ctc: "4LPA",
      location: "Mumbai",
      skills: ["Node.js", "Express", "MongoDB"],
      deadline: "2024-12-31",
    },
    {
      id: 3,
      role: "Full Stack Developer",
      company: "Buildify",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "Applied",
      experience: "5+ years",
      jobType: "Full Time",
      ctc: "12LPA",
      location: "Remote",
      skills: ["React", "Node.js", "GraphQL"],
      deadline: "",
    },
  ];

  const toggleFilterCategory = (category) => {
    setShowFilterCategory((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  const isDeadlineOpen = (deadline) => {
    if (!deadline) return true; // Consider jobs with no deadline as open
    const deadlineDate = new Date(deadline);
    return currentDate <= deadlineDate;
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesSearch &&
      (filters.status.length === 0 || filters.status.includes(job.status)) &&
      (filters.location.length === 0 || filters.location.includes(job.location)) &&
      (filters.experience.length === 0 || filters.experience.includes(job.experience)) &&
      (filters.jobType.length === 0 || filters.jobType.includes(job.jobType)) &&
      (filters.salaryRange.length === 0 || filters.salaryRange.some((range) => {
        if (range === "Below 5L") return parseFloat(job.ctc) < 5;
        if (range === "5L to 10L") return parseFloat(job.ctc) >= 5 && parseFloat(job.ctc) <= 10;
        if (range === "Above 10L") return parseFloat(job.ctc) > 10;
        return true;
      }))
    );
  });


  return (
    <div>
      <Navbar />
      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by job title or company"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="jobs-container">
        <div className="filter-panel">
          <div className="filter-header">
            <span>Filter by</span>
            <button
              onClick={() =>
                setShowFilterCategory({
                  status: false,
                  location: false,
                  experience: false,
                  jobType: false,
                  salaryRange: false,
                })
              }
            >
              Collapse all
            </button>
            <p>|</p>
            <button
              onClick={() =>
                setShowFilterCategory({
                  status: true,
                  location: true,
                  experience: true,
                  jobType: true,
                  salaryRange: true,
                })
              }
            >
              Expand all
            </button>
          </div>

          <div className={`filters ${!showFilterCategory.status ? "collapsed" : ""}`}>
            <h3 onClick={() => toggleFilterCategory("status")}>Status</h3>
            {showFilterCategory.status && (
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.status.includes("Applied")}
                    onChange={() => handleFilterChange("status", "Applied")}
                  />
                  Applied
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.status.includes("Not Applied")}
                    onChange={() => handleFilterChange("status", "Not Applied")}
                  />
                  Not Applied
                </li>
              </ul>
            )}
          </div>
          <div className={`filters ${!showFilterCategory.location ? "collapsed" : ""}`}>
            <h3 onClick={() => toggleFilterCategory("location")}>Location</h3>
            {showFilterCategory.location && (
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.location.includes("Hyderabad")}
                    onChange={() => handleFilterChange("location", "Hyderabad")}
                  />
                  Hyderabad
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.location.includes("Mumbai")}
                    onChange={() => handleFilterChange("location", "Mumbai")}
                  />
                  Mumbai
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.location.includes("Chennai")}
                    onChange={() => handleFilterChange("location", "Chennai")}
                  />
                  Chennai
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.location.includes("Remote")}
                    onChange={() => handleFilterChange("location", "Remote")}
                  />
                  Remote
                </li>
              </ul>
            )}
          </div>
          <div className={`filters ${!showFilterCategory.experience ? "collapsed" : ""}`}>
            <h3 onClick={() => toggleFilterCategory("experience")}>Experience</h3>
            {showFilterCategory.experience && (
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.experience.includes("Fresher")}
                    onChange={() => handleFilterChange("experience", "Fresher")}
                  />
                  Fresher
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.experience.includes("1-2 years")}
                    onChange={() => handleFilterChange("experience", "1-2 years")}
                  />
                  1-2 years
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.experience.includes("5+ years")}
                    onChange={() => handleFilterChange("experience", "5+ years")}
                  />
                  5+ years
                </li>
              </ul>
            )}
          </div>
          <div className={`filters ${!showFilterCategory.jobType ? "collapsed" : ""}`}>
            <h3 onClick={() => toggleFilterCategory("jobType")}>Job Type</h3>
            {showFilterCategory.jobType && (
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.jobType.includes("Full Time")}
                    onChange={() => handleFilterChange("jobType", "Full Time")}
                  />
                  Full-Time
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.jobType.includes("Internship")}
                    onChange={() => handleFilterChange("jobType", "Internship")}
                  />
                  Internship
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.jobType.includes("Internship + PPO")}
                    onChange={() => handleFilterChange("jobType", "Internship + PPO")}
                  />
                  Internship + PPO
                </li>
              </ul>
            )}
          </div>

          <div className={`filters ${!showFilterCategory.salaryRange ? "collapsed" : ""}`}>
            <h3 onClick={() => toggleFilterCategory("salaryRange")}>Salary Range</h3>
            {showFilterCategory.salaryRange && (
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.salaryRange.includes("Below 5L")}
                    onChange={() => handleFilterChange("salaryRange", "Below 5L")}
                  />
                  Below 5L
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.salaryRange.includes("5L to 10L")}
                    onChange={() => handleFilterChange("salaryRange", "5L to 10L")}
                  />
                  5L to 10L
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={filters.salaryRange.includes("Internship + PPO")}
                    onChange={() => handleFilterChange("salaryRange", "Above 10L")}
                  />
                  Above 10L
                </li>
              </ul>
            )}
          </div>
          <button
            onClick={() => {
              setFilters({
                status: [],
                location: [],
                experience: [],
                jobType: [],
                salaryRange: [],
              });
              setSearchQuery("");
            }}
            className="reset-button"
          >
            Reset Filters
          </button>
        </div>


        <div className="jobs-list">
          <h2>Jobs</h2>
          {filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-card-header">
                <h3>{job.role}</h3>
            
                <button>Apply</button>
              </div>
              <div className="badge_1">
              {isDeadlineOpen(job.deadline) ? (
                <span className="open-badge">Open</span>
              ) : (
                <span className="closed-badge">Closed</span>
              )}
            </div>
              <div className="job-details">
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Status:</strong> {job.status}</p>
                <p><strong>Experience:</strong> {job.experience}</p>
                <p><strong>Job Type:</strong> {job.jobType}</p>
                <p><strong>CTC:</strong> {job.ctc}</p>
                <p><strong>Location:</strong><span className="badge">{job.location}</span></p>
                <div className="skills_loc">
                  <strong>Skills:</strong> {job.skills.map(skill => (
                    <span key={skill} className="badge">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
