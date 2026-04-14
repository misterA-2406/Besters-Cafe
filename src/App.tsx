import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/src/components/Layout';
import Home from '@/src/pages/Home';
import About from '@/src/pages/About';
import Menu from '@/src/pages/Menu';
import Location from '@/src/pages/Location';
import Contact from '@/src/pages/Contact';
import Checkout from '@/src/pages/Checkout';
import Catering from '@/src/pages/Catering';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="menu" element={<Menu />} />
          <Route path="location" element={<Location />} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="catering" element={<Catering />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
