import React, { useState } from "react";
import ManageEvents from "./ManageEvents";
import ManageProducts from "./ManageProducts";
import ManageCustomers from "./ManageCustomers";
import OrderManagementView from "./OrderManagementView";

export default function AdminDashboard() {
  const [tab, setTab] = useState("events");
  return (
    <div className="admin-dashboard" style={{ maxWidth: 1200, margin: "40px auto", background: "#181818", borderRadius: 12, padding: 32, color: "#fff" }}>
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>Admin Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
        <button onClick={() => setTab("events")}
          style={{ fontWeight: tab === "events" ? 700 : 400, background: "none", border: "none", color: "#fff", fontSize: 18, borderBottom: tab === "events" ? "2px solid #fff" : "none", cursor: "pointer" }}>
          Manage Events
        </button>
        <button onClick={() => setTab("products")}
          style={{ fontWeight: tab === "products" ? 700 : 400, background: "none", border: "none", color: "#fff", fontSize: 18, borderBottom: tab === "products" ? "2px solid #fff" : "none", cursor: "pointer" }}>
          Manage Products
        </button>
        <button onClick={() => setTab("customers")}
          style={{ fontWeight: tab === "customers" ? 700 : 400, background: "none", border: "none", color: "#fff", fontSize: 18, borderBottom: tab === "customers" ? "2px solid #fff" : "none", cursor: "pointer" }}>
          Manage Customers
        </button>
        <button onClick={() => setTab("orders")}
          style={{ fontWeight: tab === "orders" ? 700 : 400, background: "none", border: "none", color: "#fff", fontSize: 18, borderBottom: tab === "orders" ? "2px solid #fff" : "none", cursor: "pointer" }}>
          Manage Orders
        </button>
      </div>
      {tab === "events" && <ManageEvents />}
      {tab === "products" && <ManageProducts />}
      {tab === "customers" && <ManageCustomers />}
      {tab === "orders" && <OrderManagementView />}
    </div>
  );
}
