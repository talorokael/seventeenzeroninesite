import React, { useState, useEffect } from "react";

// Utility: get/set products from localStorage
function getStoredProducts() {
  const data = localStorage.getItem("shopProducts");
  if (data) return JSON.parse(data);
  // Default products (can be replaced by backend fetch)
  return [
    { title: "Vinyl Record", price: "$29.99", img: "https://via.placeholder.com/100" },
    { title: "Cassette Tape", price: "$14.99", img: "https://via.placeholder.com/100" }
  ];
}
function setStoredProducts(products) {
  localStorage.setItem("shopProducts", JSON.stringify(products));
}

export default function ManageProducts() {
  const [products, setProducts] = useState(getStoredProducts());
  const [form, setForm] = useState({ title: "", price: "", img: "" });

  useEffect(() => { setStoredProducts(products); }, [products]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleAdd(e) {
    e.preventDefault();
    if (!form.title || !form.price || !form.img) return;
    setProducts([...products, form]);
    setForm({ title: "", price: "", img: "" });
  }
  function handleDelete(idx) {
    setProducts(products.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Shop Items</h2>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" style={{ flex: 1, minWidth: 100 }} />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price (e.g. $19.99)" style={{ flex: 1, minWidth: 100 }} />
        <input name="img" value={form.img} onChange={handleChange} placeholder="Image URL" style={{ flex: 2, minWidth: 120 }} />
        <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700 }}>Add</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((product, idx) => (
          <li key={idx} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, background: '#222', borderRadius: 6, padding: 10 }}>
            <img src={product.img} alt={product.title} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
            <span style={{ flex: 1 }}>{product.title}</span>
            <span style={{ flex: 1 }}>{product.price}</span>
            <button onClick={() => handleDelete(idx)} style={{ background: '#c00', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 700, cursor: 'pointer' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
