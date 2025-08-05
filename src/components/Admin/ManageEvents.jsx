import React, { useState, useEffect } from "react";

// Utility: get/set events from localStorage
function getStoredEvents() {
  const data = localStorage.getItem("tourEvents");
  if (data) return JSON.parse(data);
  // Default events (can be replaced by backend fetch)
  return [
    { date: 'Aug 15, 2025', city: 'Berlin', venue: 'Velodrom', link: '#' },
    { date: 'Sep 2, 2025', city: 'London', venue: 'O2 Arena', link: '#' },
    { date: 'Sep 18, 2025', city: 'Paris', venue: 'Accor Arena', link: '#' },
    { date: 'Oct 5, 2025', city: 'New York', venue: 'Madison Square Garden', link: '#' }
  ];
}
function setStoredEvents(events) {
  localStorage.setItem("tourEvents", JSON.stringify(events));
}

export default function ManageEvents() {
  const [events, setEvents] = useState(getStoredEvents());
  const [form, setForm] = useState({ date: "", city: "", venue: "", link: "" });

  useEffect(() => { setStoredEvents(events); }, [events]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleAdd(e) {
    e.preventDefault();
    if (!form.date || !form.city || !form.venue) return;
    setEvents([...events, form]);
    setForm({ date: "", city: "", venue: "", link: "" });
  }
  function handleDelete(idx) {
    setEvents(events.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Events</h2>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date" style={{ flex: 1, minWidth: 100 }} />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" style={{ flex: 1, minWidth: 100 }} />
        <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" style={{ flex: 1, minWidth: 100 }} />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Ticket Link (optional)" style={{ flex: 2, minWidth: 120 }} />
        <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700 }}>Add</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((event, idx) => (
          <li key={idx} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, background: '#222', borderRadius: 6, padding: 10 }}>
            <span style={{ flex: 1 }}>{event.date}</span>
            <span style={{ flex: 1 }}>{event.city}</span>
            <span style={{ flex: 1 }}>{event.venue}</span>
            <a href={event.link || "#"} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', flex: 1 }}>Tickets</a>
            <button onClick={() => handleDelete(idx)} style={{ background: '#c00', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 700, cursor: 'pointer' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
