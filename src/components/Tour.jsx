import React from 'react';

const events = [
  {
    date: 'Aug 15, 2025',
    city: 'Berlin',
    venue: 'Velodrom',
    link: '#'
  },
  {
    date: 'Sep 2, 2025',
    city: 'London',
    venue: 'O2 Arena',
    link: '#'
  },
  {
    date: 'Sep 18, 2025',
    city: 'Paris',
    venue: 'Accor Arena',
    link: '#'
  },
  {
    date: 'Oct 5, 2025',
    city: 'New York',
    venue: 'Madison Square Garden',
    link: '#'
  }
];

export default function Tour() {
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
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                Buy
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}