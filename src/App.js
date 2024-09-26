import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./container/Cart.js";
import ProductList from "./container/ProductList.js";
import User from "./container/User.js";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/productlist/:id" element={<ProductList />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        {/* <Route exact path="/cartsidebar" element={<Cartsidebar />} /> */}
      </Routes>
    </div>
  );
}


export default App;
