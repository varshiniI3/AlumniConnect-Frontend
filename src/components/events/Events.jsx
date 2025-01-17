import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './events.css';
import Navbar from '../home/Navbar';

function Events() {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const upcomingEvents = [
    {
      title: "Graduation Day 2025",
      date: "2025-04-15",
      time: "10:00 AM - 2:00 PM",
      description:
        "Celebrate the accomplishments of our graduates in the grandest ceremony of the year. Join us as we honor the class of 2025, enjoy speeches, and cheer for the students stepping into the next chapter of their lives.",
      location: "University Auditorium, New York City",
      speaker: "Dr. Emma Green, Chancellor",
      coordinator: {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1 (123) 456-7890",
      },
      activities: [
        "Keynote Speech by Dr. Emma Green",
        "Award Ceremony for Top Achievers",
        "Networking Lunch for Students and Guests",
      ],
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/021/636/092/small_2x/graduation-banner-design-with-space-for-text-class-of-2023-free-vector.jpg",
    },
  ];

  const completedEvents = [
    {
      title: "Alumni Reunion 2024",
      date: "2024-10-15",
      description:
        "A nostalgic evening filled with laughter, memories, and cherished moments. Alumni from various batches gathered to reconnect, share stories, and reminisce about their time at the university.",
      location: "Main Hall, Downtown Campus",
      highlights: [
        "Cultural performances by current students",
        "Keynote Address: 'Leadership and Legacy' by Dr. Samuel Harris",
        "Interactive panel discussion: 'Alumni as Mentors'",
        "Exclusive Gala Dinner and Networking Session",
      ],
      feedback:
        "The Alumni Reunion was a tremendous success, with attendees praising the seamless organization and heartfelt connection fostered through the event. Many look forward to the next gathering!",
      image:
        "https://jindal.utdallas.edu/files/2024/05/hero-image-alum.jpg",
    },
  ];

  const eventsToDisplay = showUpcoming ? upcomingEvents : completedEvents;

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredEvents = eventsToDisplay.filter((event) =>
    Object.values(event)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-page bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <div className="text-center py-12">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Events</h2>

        {/* Toggle Buttons and Search Bar */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={() => setShowUpcoming(true)}
            className={`px-6 py-3 rounded-full ${
              showUpcoming ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setShowUpcoming(false)}
            className={`px-6 py-3 rounded-full ${
              !showUpcoming ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Completed Events
          </button>

          <input
            type="text"
            placeholder="Search events..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Events Section */}
      <div className="event-section grid grid-cols-1 gap-8 px-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div
              key={index}
              className="event-card bg-white shadow-lg rounded-lg flex flex-col md:flex-row-reverse hover:shadow-2xl transition-all"
            >
              <div className="event-image md:w-1/2">
                <img
                  src={event.image}
                  alt={event.title}
                  className="rounded-t-lg md:rounded-r-lg md:rounded-tl-none w-full h-full object-cover"
                />
              </div>
              <div className="event-content p-6 md:w-1/2">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {highlightText(event.title)}
                </h3>
                <p className="text-gray-500 mb-4">
                  {highlightText(event.date)} {event.time ? `| ${highlightText(event.time)}` : ''}
                </p>
                <p className="text-gray-700 mb-4">{highlightText(event.description)}</p>
                {event.location && (
                  <p className="text-gray-500 mb-4">Location: {highlightText(event.location)}</p>
                )}
                {event.highlights && (
                  <ul className="text-gray-700 list-disc list-inside mb-4">
                    {event.highlights.map((highlight, i) => (
                      <li key={i}>{highlightText(highlight)}</li>
                    ))}
                  </ul>
                )}
                {event.feedback && <p className="text-gray-700 mb-4">{highlightText(event.feedback)}</p>}
                {event.coordinator && (
                  <div className="text-gray-700 mb-4">
                    <p>
                      <strong>Coordinator:</strong> {highlightText(event.coordinator.name)}
                    </p>
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href={`mailto:${event.coordinator.email}`} className="text-red-600">
                        {highlightText(event.coordinator.email)}
                      </a>
                    </p>
                    <p>
                      <strong>Phone:</strong> {highlightText(event.coordinator.phone)}
                    </p>
                  </div>
                )}
                {event.activities && (
                  <ul className="text-gray-700 list-disc list-inside mb-4">
                    {event.activities.map((activity, i) => (
                      <li key={i}>{highlightText(activity)}</li>
                    ))}
                  </ul>
                )}
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
                  {showUpcoming ? 'Register Now' : 'Know More'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
}

export default Events;
