function getEvents() {
  const data = localStorage.getItem("tourEvents");
  if (data) return JSON.parse(data);
  return [
    { date: 'Aug 15, 2025', city: 'Berlin', venue: 'Velodrom', link: '#' },
    { date: 'Sep 2, 2025', city: 'London', venue: 'O2 Arena', link: '#' },
    { date: 'Sep 18, 2025', city: 'Paris', venue: 'Accor Arena', link: '#' },
    { date: 'Oct 5, 2025', city: 'New York', venue: 'Madison Square Garden', link: '#' }
  ];
}

import React, { useState, useEffect } from 'react';

export default function Tour() {
  const [events, setEvents] = useState(getEvents());
  useEffect(() => {
    function handleStorage() { setEvents(getEvents()); }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: 40 }}>TOUR</h1>
      <section className="tour-table">
        <div className="tour-table-headings">
          <div>Date</div>
          <div>City</div>
          <div>Venue</div>
          <div>Tickets</div>
        </div>
        {events.map((event, idx) => (
          <div className="tour-table-row" key={idx}>
            <div>{event.date}</div>
            <div>{event.city}</div>
            <div>{event.venue}</div>
            <div>
              <a
                href={
                  /^https?:\/\//i.test(event.link?.trim())
                    ? event.link.trim()
                    : "https://" + (event.link?.trim() || "").replace(/^\/+/, "")
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}