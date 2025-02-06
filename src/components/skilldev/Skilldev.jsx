import React, { useEffect, useState } from 'react';
import './skilldev.css';
import Navbar from '../home/Navbar';
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { MdDateRange, MdUpdate } from "react-icons/md";
import axios from 'axios';

function Skilldev() {
  const [filters, setFilters] = useState({
    type: [],
    status: [],
  });
  const [totEvents, setTotEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const sessionUrl = process.env.REACT_APP_SESSION_URL;

  // Dummy events data
  const dummyEventsData = [
    {
      title: "React Webinar",
      type: "Webinar",
      status: "upcoming",
      hostName: "John Doe",
      description: "An informative webinar on React for beginners.",
      scheduledAt: "2025-02-20T10:00:00",
      period: 60,
      sessionId: "123abc",
    },
    {
      title: "MERN Stack Workshop",
      type: "Workshop",
      status: "active",
      hostName: "Jane Smith",
      description: "Hands-on workshop for building full-stack apps with MERN.",
      scheduledAt: "2025-02-10T14:00:00",
      period: 120,
      sessionId: "456def",
    },
    {
      title: "Mock Interview for Web Developers",
      type: "Mock Interview",
      status: "past",
      hostName: "Bob Johnson",
      description: "Prepare for your next interview with a mock session.",
      scheduledAt: "2025-01-15T10:00:00",
      period: 90,
      sessionId: "789ghi",
    },
    {
      title: "Node.js Masterclass",
      type: "Webinar",
      status: "active",
      hostName: "Alice Cooper",
      description: "Advanced Node.js concepts for experienced developers.",
      scheduledAt: "2025-02-12T18:00:00",
      period: 75,
      sessionId: "101112jkl",
    },
    {
      title: "Frontend Development Bootcamp",
      type: "Workshop",
      status: "upcoming",
      hostName: "Charlie Brown",
      description: "Intensive bootcamp to become proficient in frontend development.",
      scheduledAt: "2025-02-18T09:00:00",
      period: 180,
      sessionId: "131415mno",
    },
  ];

  useEffect(() => {
    setTotEvents(dummyEventsData);
  }, []);

  useEffect(() => {
    if (totEvents.length > 0) {
      setActiveEvents(
        totEvents.filter((event) => {
          const matchesType = filters.type.length === 0 || filters.type.includes(event.type);
          const matchesStatus = filters.status.length === 0 || filters.status.includes(event.status);
          const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesType && matchesStatus && matchesSearchTerm;
        })
      );
    }
  }, [filters, totEvents, searchTerm]);

  const handleFilterChange = (e, category) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const newCategoryFilters = checked
        ? [...prevFilters[category], value]
        : prevFilters[category].filter((item) => item !== value);
      return {
        ...prevFilters,
        [category]: newCategoryFilters,
      };
    });
  };

  const handleResetFilters = () => {
    setFilters({
      type: [],
      status: [],
    });
  };

  return (
    <div className="skilldev">
      <Navbar />
      <div className="content-wrapper">
        {/* Filters Section */}
        <div className="filters">
          {/* Event Type Filters */}
          <div className="filter-group">
            <h3>Event Type</h3>
            <label>
              <input
                type="checkbox"
                value="Webinar"
                checked={filters.type.includes('Webinar')}
                onChange={(e) => handleFilterChange(e, 'type')}
              />
              Webinar
            </label>
            <label>
              <input
                type="checkbox"
                value="Workshop"
                checked={filters.type.includes('Workshop')}
                onChange={(e) => handleFilterChange(e, 'type')}
              />
              Workshop
            </label>
            <label>
              <input
                type="checkbox"
                value="Mock Interview"
                checked={filters.type.includes('Mock Interview')}
                onChange={(e) => handleFilterChange(e, 'type')}
              />
              Mock Interview
            </label>
          </div>

          {/* Event Status Filters */}
          <div className="filter-group">
            <h3>Event Status</h3>
            <label>
              <input
                type="checkbox"
                value="active"
                checked={filters.status.includes('active')}
                onChange={(e) => handleFilterChange(e, 'status')}
              />
              Active
            </label>
            <label>
              <input
                type="checkbox"
                value="upcoming"
                checked={filters.status.includes('upcoming')}
                onChange={(e) => handleFilterChange(e, 'status')}
              />
              Upcoming
            </label>
            <label>
              <input
                type="checkbox"
                value="past"
                checked={filters.status.includes('past')}
                onChange={(e) => handleFilterChange(e, 'status')}
              />
              Past
            </label>
          </div>

          {/* Reset Filters Button */}
          <div className="reset-filters-box">
            <button onClick={handleResetFilters}>Reset Filters</button>
          </div>
        </div>

        

        {/* Event Cards Section */}
        <div className="eventHolder">
          {/* Search Bar - Moved inside eventHolder */}
  <div className="search-bar-container">
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-bar"
    />
  </div>

          <div className="eventBox">
            <div className="event-row">
              {activeEvents.map((event, key) => (
                <div className="event" key={key}>
                  <span className="event-title">
                    <p className="text-2xl font-semibold">{event.title}</p>
                  </span>
                  <span className="event-type-host flex">
                    <p className="mr-4">{event.type}</p>
                    <p className="ml-4 mr-4 font-bold">|</p>
                    <p className="flex items-center gap-2">{event.hostName}</p>
                  </span>
                  <span className="event-description">
                    <p>{event.description}</p>
                  </span>
                  <span className="event-details">
                    <p className="flex mt-1 mb-1">
                      <MdDateRange className="text-2xl" />
                      {event.scheduledAt.slice(8, 10) +
                        '/' +
                        event.scheduledAt.slice(5, 7) +
                        '/' +
                        event.scheduledAt.slice(0, 4)}
                      {event.scheduledAt.slice(11, 13) > '12'
                        ? ' ' +
                          (event.scheduledAt.slice(11, 13) - 12) +
                          event.scheduledAt.slice(13, 16) +
                          'PM'
                        : ' ' + event.scheduledAt.slice(11, 16) + 'AM'}
                    </p>
                    <p className="flex">
                      <MdUpdate className="text-2xl" /> {event.period} mins
                    </p>
                  </span>

                  {/* Conditional Button */}
                  <span className="flex h-full bg-blue min-w-fit text-xl font-semibold align-middle items-center">
                    {event.status === 'active' && (
                      <a href={`${sessionUrl}/${event.sessionId}`} target="_blank" rel="noreferrer">
                        Join Session
                      </a>
                    )}
                    {event.status === 'upcoming' && (
                      <button className="interested-button">
                        I'm Interested
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skilldev;
