import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
              {/* <Link to="/product" className="nav-link" aria-current="page">
                  product
              </Link> */}
              </li>
              <li className="nav-item">
              <Link to="/productlist" className="nav-link" aria-current="page">
                  ProductList
              </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
