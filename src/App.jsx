import React,{useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sell from "./pages/Sell";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import firebase from "firebase/compat/app";
import { clearUser, setUser } from "./slices/authSlice";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if(firebaseUser){
        dispatch(setUser({
          uid : firebaseUser.uid, 
          email : firebaseUser.email, 
          displayName : firebase.displayname
        })
      )
      } else {
        dispatch(clearUser());
      }
    })

    return () => unsubscribe()
  }, [dispatch])


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/sell" element={<Sell/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
