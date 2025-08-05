import React, { useState, useEffect } from "react";

// Utility: get/set products from localStorage
function getStoredProducts() {
  const data = localStorage.getItem("shopProducts");
  return data ? JSON.parse(data) : [];
}
function setStoredProducts(products) {
  localStorage.setItem("shopProducts", JSON.stringify(products));
}

export default function ManageProducts() {
  const [products, setProducts] = useState(getStoredProducts());
  const [form, setForm] = useState({ title: "", price: "", img: "" });
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => { setStoredProducts(products); }, [products]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, img: reader.result }));
        setImgFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      setForm(f => ({ ...f, img: "" }));
      setImgFile(null);
    }
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!form.title || !form.price || !form.img) return;
    const newProduct = { ...form, id: Date.now().toString() };
    setProducts([...products, newProduct]);
    setForm({ title: "", price: "", img: "" });
    setImgFile(null);
    // Optionally reset file input
    if (e.target && e.target.reset) e.target.reset();
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
        <input type="file" accept="image/*" onChange={handleFileChange} style={{ flex: 2, minWidth: 120 }} />
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
