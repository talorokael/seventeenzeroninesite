import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OverlayNav from './components/OverlayNav';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';



function Home() {
  return (
    <main className="center-img-wrap">
      <img className="center-img" alt="JACKBOYS2" src="https://cdn.sanity.io/images/vfp8z5al/production/da175aa954df2392a9b17220db9780979cc893d1-1000x1000.jpg?q=75&fit=clip&auto=format" />
    </main>
  );
}

function Shop() {
  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: 40 }}>Shop</h1>
      <ProductGrid />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <OverlayNav />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}
