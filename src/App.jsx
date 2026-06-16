import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Wishlist" element={<Wishlist/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
