import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import OverlayNav from './components/OverlayNav';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Tour from './components/Tour';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import { CartProvider } from './components/CartContext';
import CartOverlay from './components/CartOverlay';

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
      <Footer />
    </main>
  );
}

function TourPage(){
  return(
    <main>
      <Tour />
    </main>
  )
}

function AppContent() {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith("/product");
  const isShopPage = location.pathname === "/shop";
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <CartProvider>
      <>
        {!isProductPage && !isShopPage && !isCheckoutPage && <OverlayNav />}
        {!isProductPage && !isCheckoutPage && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/tour" element={<TourPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </>
      <CartOverlay />
    </CartProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}